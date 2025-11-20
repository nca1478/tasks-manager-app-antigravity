import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { Task, TaskStatus, TaskPriority } from "@domain/entities/task.entity";
import {
  TaskRepository,
  TASK_REPOSITORY,
} from "@domain/repositories/task.repository";
import { UpdateTaskDto } from "../../dtos/task/update-task.dto";

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    if (!task.isOwnedBy(userId)) {
      throw new ForbiddenException(
        "You do not have permission to update this task"
      );
    }

    task.update({
      title: updateTaskDto.title,
      description: updateTaskDto.description,
      status: updateTaskDto.status as TaskStatus,
      priority: updateTaskDto.priority as TaskPriority,
      dueDate: updateTaskDto.dueDate
        ? new Date(updateTaskDto.dueDate)
        : undefined,
    });

    return this.taskRepository.update(id, task);
  }
}
