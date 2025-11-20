import { Task, TaskStatus, TaskPriority } from "../entities/task.entity";

export interface QueryTasksOptions {
  status?: TaskStatus;
  priority?: TaskPriority;
  sortBy?: "title" | "createdAt" | "priority" | "status" | "dueDate";
  sortOrder?: "asc" | "desc";
}

export interface TaskRepository {
  create(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByUserId(userId: string): Promise<Task[]>;
  findByUserIdWithFilters(
    userId: string,
    options: QueryTasksOptions
  ): Promise<Task[]>;
  findAll(): Promise<Task[]>;
  update(id: string, task: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}

export const TASK_REPOSITORY = Symbol("TASK_REPOSITORY");
