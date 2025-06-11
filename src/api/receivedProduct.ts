import { api } from "./axios";

export const createReceivedProduct = async (
    codigo: string,
    descripcion: string,
    cantidad_odc: number,
    cantidad_recibida: number,
    recepcion: number
) => {
    const response = await api.post("/producto-recibido", {
        codigo,
        descripcion,
        cantidad_odc,
        cantidad_recibida,
        recepcion
    });
    return response;
}