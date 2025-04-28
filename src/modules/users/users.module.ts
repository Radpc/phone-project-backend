import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepoService } from './repos/users-repo.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepoService,
    { provide: 'IUsersRepo', useExisting: UsersRepoService },
  ],
})
export class UsersModule {}
