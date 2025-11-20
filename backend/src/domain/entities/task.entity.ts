export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class Task {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string | null,
    public status: TaskStatus,
    public priority: TaskPriority,
    public dueDate: Date | null,
    public readonly userId: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    title: string,
    userId: string,
    description?: string,
    priority: TaskPriority = TaskPriority.MEDIUM,
    dueDate?: Date,
  ): Task {
    return new Task(
      crypto.randomUUID(),
      title,
      description || null,
      TaskStatus.PENDING,
      priority,
      dueDate || null,
      userId,
      new Date(),
      new Date(),
    );
  }

  update(data: {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: Date;
  }): void {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.status !== undefined) this.status = data.status;
    if (data.priority !== undefined) this.priority = data.priority;
    if (data.dueDate !== undefined) this.dueDate = data.dueDate;
    this.updatedAt = new Date();
  }

  markAsCompleted(): void {
    this.status = TaskStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  markAsInProgress(): void {
    this.status = TaskStatus.IN_PROGRESS;
    this.updatedAt = new Date();
  }

  isOwnedBy(userId: string): boolean {
    return this.userId === userId;
  }
}
