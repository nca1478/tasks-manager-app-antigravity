export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public name: string,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    email: string,
    password: string,
    name: string,
  ): User {
    return new User(
      crypto.randomUUID(),
      email,
      password,
      name,
      new Date(),
      new Date(),
    );
  }

  updateProfile(name?: string, email?: string): void {
    if (name) this.name = name;
    if (email) this.email = email;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
