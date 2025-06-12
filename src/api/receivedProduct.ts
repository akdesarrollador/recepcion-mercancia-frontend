import { api } from "./axios";

export const createReceivedProduct = async (
  codigo: string,
  descripcion: string,
  cantidad_odc: number,
  recibido: number,
  unidades_por_bulto: number,
  recepcion: number
) => {
  const response = await api.post("/producto-recibido", {
    codigo,
    descripcion,
    cantidad_odc,
    recibido,
    unidades_por_bulto,
    recepcion,
  });
  return response;
};
