import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UserController } from '../controllers/user.controller';
import { USER_REPOSITORY } from '@domain/repositories/user.repository';
import { PrismaUserRepository } from '../repositories/prisma-user.repository';
import { CreateUserUseCase } from '@application/use-cases/user/create-user.use-case';
import { GetAllUsersUseCase } from '@application/use-cases/user/get-all-users.use-case';
import { GetUserByIdUseCase } from '@application/use-cases/user/get-user-by-id.use-case';
import { UpdateUserUseCase } from '@application/use-cases/user/update-user.use-case';
import { DeleteUserUseCase } from '@application/use-cases/user/delete-user.use-case';

@Module({
  controllers: [UserController],
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
  ],
  exports: [USER_REPOSITORY, CreateUserUseCase],
})
export class UserModule {}
