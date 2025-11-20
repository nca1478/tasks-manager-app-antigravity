import { httpClient } from "../http/http-client";
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
} from "@/domain/entities/task.entity";

export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await httpClient.get<Task[]>("/tasks");
    return response.data;
  },

  getById: async (id: string): Promise<Task> => {
    const response = await httpClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  create: async (data: CreateTaskData): Promise<Task> => {
    const response = await httpClient.post<Task>("/tasks", data);
    return response.data;
  },

  update: async (id: string, data: UpdateTaskData): Promise<Task> => {
    const response = await httpClient.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await httpClient.delete(`/tasks/${id}`);
  },
};
