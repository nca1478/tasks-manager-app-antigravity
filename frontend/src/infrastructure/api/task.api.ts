import { httpClient } from "../http/http-client";
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskStatus,
  TaskPriority,
} from "@/domain/entities/task.entity";

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  sortBy?: "title" | "createdAt" | "priority" | "status" | "dueDate";
  sortOrder?: "asc" | "desc";
}

export const taskApi = {
  getAll: async (filters?: TaskFilters): Promise<Task[]> => {
    const params = new URLSearchParams();

    if (filters?.status) params.append("status", filters.status);
    if (filters?.priority) params.append("priority", filters.priority);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

    const queryString = params.toString();
    const url = queryString ? `/tasks?${queryString}` : "/tasks";

    const response = await httpClient.get<Task[]>(url);
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
