import { Inject, Injectable } from '@nestjs/common';
import { Task } from '@domain/entities/task.entity';
import { TaskRepository, TASK_REPOSITORY } from '@domain/repositories/task.repository';

@Injectable()
export class GetTasksByUserUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(userId: string): Promise<Task[]> {
    return this.taskRepository.findByUserId(userId);
  }
}
