import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { taskApi } from "@/infrastructure/api/task.api";
import { CreateTaskData, UpdateTaskData } from "@/domain/entities/task.entity";
import { toast } from "sonner";
import { getTranslation } from "@/infrastructure/i18n/get-translations";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: taskApi.getAll,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => taskApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) => taskApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(getTranslation("tasks.createSuccess"));
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || getTranslation("tasks.createError")
      );
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      taskApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(getTranslation("tasks.updateSuccess"));
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || getTranslation("tasks.updateError")
      );
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success(getTranslation("tasks.deleteSuccess"));
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || getTranslation("tasks.deleteError")
      );
    },
  });
};
