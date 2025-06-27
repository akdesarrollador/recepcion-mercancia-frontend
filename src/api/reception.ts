import { api } from "./axios";

interface createReceptionParams {
  ordenes: string[];
  proveedor: string;
  codigoProveedor: string;
  productos_recibidos: {
    codig0: string;
    descripcion: string;
    unidades_odc: number;
    unidades: number;
    unidades_por_bulto: number;
  }[];
  duracion: string;
}

export const createReception = async (data: createReceptionParams) => {
  const response = await api.post("/recepcion", data);
  return response;
};
