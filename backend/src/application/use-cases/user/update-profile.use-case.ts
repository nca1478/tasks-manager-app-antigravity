import { Inject, Injectable, ConflictException } from "@nestjs/common";
import { User } from "@domain/entities/user.entity";
import {
  UserRepository,
  USER_REPOSITORY,
} from "@domain/repositories/user.repository";
import { UpdateProfileDto } from "@application/dtos/user/update-profile.dto";

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    userId: string,
    updateProfileDto: UpdateProfileDto
  ): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Check if email is being changed and if it's already in use
    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(
        updateProfileDto.email
      );
      if (existingUser) {
        throw new ConflictException("Email already in use");
      }
    }

    // Update user fields
    const updatedUser = await this.userRepository.update(userId, {
      ...user,
      ...updateProfileDto,
    });

    return updatedUser;
  }
}
