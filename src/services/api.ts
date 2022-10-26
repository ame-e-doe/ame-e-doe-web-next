import { parseCookies } from "nookies";
import axios, { AxiosError } from "axios";
import { AuthTokenError } from "./errors/auth-token-error";

export function setupApiClient(context = undefined) {
  const cookies = parseCookies(context);

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${cookies["@nextauth.token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // usuario deve ser deslogado
        if (window !== undefined) {
          // chamar o metodo para deslogar user
        } else {
          return await Promise.reject(new AuthTokenError());
        }
      }
      return await Promise.reject(error);
    }
  );

  return api;
}
