import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/modules/auth.module';
import { UserModule } from './infrastructure/modules/user.module';
import { TaskModule } from './infrastructure/modules/task.module';

@Module({
  imports: [AuthModule, UserModule, TaskModule],
})
export class AppModule {}
