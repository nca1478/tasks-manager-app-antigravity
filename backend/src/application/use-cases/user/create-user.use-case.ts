import { Inject, Injectable, ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "@domain/entities/user.entity";
import {
  UserRepository,
  USER_REPOSITORY,
} from "@domain/repositories/user.repository";
import { CreateUserDto } from "../../dtos/user/create-user.dto";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email
    );

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = User.create(
      createUserDto.email,
      hashedPassword,
      createUserDto.name
    );

    return this.userRepository.create(user);
  }
}
