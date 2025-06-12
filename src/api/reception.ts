import { api } from "./axios";

interface createReceptionParams {
  numeroOrden: string;
  proveedor: string;
  sucursal: string;
}

export const createReception = async (data: createReceptionParams) => {
  const response = await api.post("/recepcion", data);
  return response;
};
