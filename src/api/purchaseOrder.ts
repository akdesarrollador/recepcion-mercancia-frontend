import { api } from "./axios";

export const getPurchaseOrder = async (orderNumber: string) => {
    const response = await api.get(`/orden-compra/${orderNumber}`);
    return response;
}