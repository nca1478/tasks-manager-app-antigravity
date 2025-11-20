import { Inject, Injectable } from "@nestjs/common";
import { Task, TaskPriority } from "@domain/entities/task.entity";
import {
  TaskRepository,
  TASK_REPOSITORY,
} from "@domain/repositories/task.repository";
import { CreateTaskDto } from "../../dtos/task/create-task.dto";

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(userId: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = Task.create(
      createTaskDto.title,
      userId,
      createTaskDto.description,
      createTaskDto.priority || TaskPriority.MEDIUM,
      createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : undefined
    );

    return this.taskRepository.create(task);
  }
}
