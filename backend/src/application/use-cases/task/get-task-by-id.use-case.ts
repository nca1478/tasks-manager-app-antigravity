import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Task } from '@domain/entities/task.entity';
import { TaskRepository, TASK_REPOSITORY } from '@domain/repositories/task.repository';

@Injectable()
export class GetTaskByIdUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string, userId: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (!task.isOwnedBy(userId)) {
      throw new ForbiddenException('You do not have permission to access this task');
    }

    return task;
  }
}
