import { api } from "./axios";

export const createBillImage = async (
  imagen: File,
  recepcion: number,
  location: string,
  numeroOrden: string
) => {
  const formData = new FormData();

  formData.append("comprobantes", imagen);
  formData.append("recepcion", recepcion.toString());
  formData.append("location", location);
  formData.append("numeroOrden", numeroOrden);

  const response = await api.post("/comprobante", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
