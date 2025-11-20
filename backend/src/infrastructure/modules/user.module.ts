import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { UserController } from "../controllers/user.controller";
import { ProfileController } from "../controllers/profile.controller";
import { USER_REPOSITORY } from "@domain/repositories/user.repository";
import { PrismaUserRepository } from "../repositories/prisma-user.repository";
import { CreateUserUseCase } from "@application/use-cases/user/create-user.use-case";
import { GetAllUsersUseCase } from "@application/use-cases/user/get-all-users.use-case";
import { GetUserByIdUseCase } from "@application/use-cases/user/get-user-by-id.use-case";
import { UpdateUserUseCase } from "@application/use-cases/user/update-user.use-case";
import { DeleteUserUseCase } from "@application/use-cases/user/delete-user.use-case";
import { GetUserProfileUseCase } from "@application/use-cases/user/get-user-profile.use-case";
import { UpdateProfileUseCase } from "@application/use-cases/user/update-profile.use-case";
import { ChangePasswordUseCase } from "@application/use-cases/user/change-password.use-case";

@Module({
  controllers: [UserController, ProfileController],
  providers: [
    PrismaService,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserProfileUseCase,
    UpdateProfileUseCase,
    ChangePasswordUseCase,
  ],
  exports: [USER_REPOSITORY, CreateUserUseCase],
})
export class UserModule {}
