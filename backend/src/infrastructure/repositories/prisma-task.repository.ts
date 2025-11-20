import { Injectable } from '@nestjs/common';
import { Task, TaskStatus, TaskPriority } from '@domain/entities/task.entity';
import { TaskRepository } from '@domain/repositories/task.repository';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: Task): Promise<Task> {
    const created = await this.prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        userId: task.userId,
      },
    });

    return new Task(
      created.id,
      created.title,
      created.description,
      created.status as TaskStatus,
      created.priority as TaskPriority,
      created.dueDate,
      created.userId,
      created.createdAt,
      created.updatedAt,
    );
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) return null;

    return new Task(
      task.id,
      task.title,
      task.description,
      task.status as TaskStatus,
      task.priority as TaskPriority,
      task.dueDate,
      task.userId,
      task.createdAt,
      task.updatedAt,
    );
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map(
      (task) =>
        new Task(
          task.id,
          task.title,
          task.description,
          task.status as TaskStatus,
          task.priority as TaskPriority,
          task.dueDate,
          task.userId,
          task.createdAt,
          task.updatedAt,
        ),
    );
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return tasks.map(
      (task) =>
        new Task(
          task.id,
          task.title,
          task.description,
          task.status as TaskStatus,
          task.priority as TaskPriority,
          task.dueDate,
          task.userId,
          task.createdAt,
          task.updatedAt,
        ),
    );
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const updated = await this.prisma.task.update({
      where: { id },
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        updatedAt: new Date(),
      },
    });

    return new Task(
      updated.id,
      updated.title,
      updated.description,
      updated.status as TaskStatus,
      updated.priority as TaskPriority,
      updated.dueDate,
      updated.userId,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
