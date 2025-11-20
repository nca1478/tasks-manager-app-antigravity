import { httpClient } from "../http/http-client";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "@/domain/entities/user.entity";

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>(
      "/auth/register",
      data
    );
    return response.data;
  },
};
