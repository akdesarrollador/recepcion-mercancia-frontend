import axios from "axios";
import { apiUrl } from "../utils/config";
import { useAuthStore } from "../store/useAuthStore";
import useGlobalStore from "../store/useGlobalStore";

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (config?.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { openSnackbar } = useGlobalStore.getState();
    let msj: string;

    if (error?.response?.data?.codigo === 429) {
      msj = "Error de conexión. Por favor, intente de nuevo en unos segundos.";
    } else {
      msj =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Ocurrió un error inesperado. Por favor, intente nuevamente.";
    }

    openSnackbar(msj, "error");
    if (!import.meta.env.PROD) {
      console.error("Error en la petición:", msj, error);
    }
    return Promise.reject(error);
  }
);
