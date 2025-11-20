import { IsOptional, IsEnum, IsIn } from "class-validator";
import { TaskStatus, TaskPriority } from "@domain/entities/task.entity";

export class QueryTasksDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsIn(["title", "createdAt", "priority", "status", "dueDate"])
  sortBy?: "title" | "createdAt" | "priority" | "status" | "dueDate";

  @IsOptional()
  @IsIn(["asc", "desc"])
  sortOrder?: "asc" | "desc";
}
