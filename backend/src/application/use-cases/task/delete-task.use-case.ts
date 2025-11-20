import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TaskRepository, TASK_REPOSITORY } from '@domain/repositories/task.repository';

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const task = await this.taskRepository.findById(id);
    
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (!task.isOwnedBy(userId)) {
      throw new ForbiddenException('You do not have permission to delete this task');
    }

    await this.taskRepository.delete(id);
  }
}
