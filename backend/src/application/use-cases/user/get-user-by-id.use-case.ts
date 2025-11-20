import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@domain/entities/user.entity';
import { UserRepository, USER_REPOSITORY } from '@domain/repositories/user.repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
