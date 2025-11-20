import { httpClient } from "../http/http-client";
import { User } from "@/domain/entities/user.entity";

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await httpClient.get<User>("/users/me");
    return response.data;
  },

  getAll: async (): Promise<User[]> => {
    const response = await httpClient.get<User[]>("/users");
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await httpClient.get<User>(`/users/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await httpClient.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await httpClient.delete(`/users/${id}`);
  },
};
