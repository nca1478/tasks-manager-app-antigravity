import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@domain/entities/user.entity";
import {
  UserRepository,
  USER_REPOSITORY,
} from "@domain/repositories/user.repository";
import { UpdateUserDto } from "../../dtos/user/update-user.dto";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.updateProfile(updateUserDto.name, updateUserDto.email);

    return this.userRepository.update(id, user);
  }
}
