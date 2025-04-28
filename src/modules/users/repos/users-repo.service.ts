import { PrismaService } from 'src/modules/prisma/prisma.service';
import { User } from '../entities/user.entity';
import {
  ICreateUser,
  IListUsersParams,
  IUpdateUser,
  UsersRepoInterface,
} from './users-repo-interface';
import { ServiceError, ServiceErrorType } from 'src/utils/service-error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepoService implements UsersRepoInterface {
  constructor(private prisma: PrismaService) {}

  create(payload: ICreateUser): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }
  update(userId: number, payload: IUpdateUser): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }
  get(userId: number): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }

  async getByEmail(email: string): Promise<{ data: User }> {
    const res = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!res) {
      throw new ServiceError('User not found', ServiceErrorType.NotFound);
    }
    return { data: User.fromRaw(res) };
  }

  list(params: IListUsersParams): Promise<{ data: User[]; total: number }> {
    throw new Error('Method not implemented.');
  }
  delete(userId: number): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }
}
