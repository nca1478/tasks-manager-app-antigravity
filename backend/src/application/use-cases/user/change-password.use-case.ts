import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {
  UserRepository,
  USER_REPOSITORY,
} from "@domain/repositories/user.repository";
import { ChangePasswordDto } from "@application/dtos/user/change-password.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(
    userId: string,
    changePasswordDto: ChangePasswordDto
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      10
    );

    // Update password
    await this.userRepository.update(userId, {
      ...user,
      password: hashedNewPassword,
    });
  }
}
