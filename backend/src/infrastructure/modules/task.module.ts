import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { TaskController } from '../controllers/task.controller';
import { TASK_REPOSITORY } from '@domain/repositories/task.repository';
import { PrismaTaskRepository } from '../repositories/prisma-task.repository';
import { CreateTaskUseCase } from '@application/use-cases/task/create-task.use-case';
import { GetTasksByUserUseCase } from '@application/use-cases/task/get-tasks-by-user.use-case';
import { GetTaskByIdUseCase } from '@application/use-cases/task/get-task-by-id.use-case';
import { UpdateTaskUseCase } from '@application/use-cases/task/update-task.use-case';
import { DeleteTaskUseCase } from '@application/use-cases/task/delete-task.use-case';

@Module({
  controllers: [TaskController],
  providers: [
    PrismaService,
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository,
    },
    CreateTaskUseCase,
    GetTasksByUserUseCase,
    GetTaskByIdUseCase,
    UpdateTaskUseCase,
    DeleteTaskUseCase,
  ],
})
export class TaskModule {}
