import { Inject, Injectable } from "@nestjs/common";
import { Task } from "@domain/entities/task.entity";
import {
  TaskRepository,
  TASK_REPOSITORY,
  QueryTasksOptions,
} from "@domain/repositories/task.repository";

@Injectable()
export class GetTasksByUserUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(userId: string, options?: QueryTasksOptions): Promise<Task[]> {
    if (options && (options.status || options.priority || options.sortBy)) {
      return this.taskRepository.findByUserIdWithFilters(userId, options);
    }
    return this.taskRepository.findByUserId(userId);
  }
}
