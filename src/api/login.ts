import { api } from "./axios";

const login = async (password: string) => {
    const response = await api.post("/auth/login", { password });
    return response;
}

export default login;