import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepoService } from './repos/users-repo.service';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepoService,
    { provide: 'IUsersRepo', useExisting: UsersRepoService },
  ],
})
export class UsersModule {}
