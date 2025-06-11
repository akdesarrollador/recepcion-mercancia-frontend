import { persist } from "zustand/middleware";
import { create } from "zustand";
import login from "../api/login";

export interface AuthStoreType {
  token: string | null;
  tienda: string | null;
  isLoggedIn: boolean;
  onLogin: (password: string) => Promise<LoginResponse>;
  clean: () => void;
}

export interface LoginResponse {
  message: string;
  user: {
    nIDFichaEmpleado: number;
    nCedula: number;
    cNombre: string;
    cApellido: string;
    cCreadoEnTienda: string;
  };
  token: string;
  codigo?: number;
}

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      token: null,
      tienda: null,
      isLoggedIn: false,
      onLogin: async (password: string): Promise<LoginResponse> => {
        const response = await login(password);

        if (
          response.status === 200 &&
          response.data.token &&
          response.data.user
        ) {
          set({
            token: response.data.token,
            tienda: response.data.user.cCreadoEnTienda,
            isLoggedIn: true,
          });
        }

        return {
          ...response.data,
          codigo: response.status,
        } as LoginResponse;
      },
      clean: () => {
        set({
          token: null,
          tienda: null,
          isLoggedIn: false,
        });
      },
    }),
    { name: "auth-storage-rdm" }
  )
);
