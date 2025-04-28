import { User } from '../entities/user.entity';
import {
  ICreateUser,
  IListUsersParams,
  IUpdateUser,
  UsersRepoInterface,
} from './users-repo-interface';

export class UsersRepoService implements UsersRepoInterface {
  create(payload: ICreateUser): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }
  update(userId: number, payload: IUpdateUser): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }
  get(userId: number): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }
  list(params: IListUsersParams): Promise<{ data: User[]; total: number }> {
    throw new Error('Method not implemented.');
  }
  delete(userId: number): Promise<{ data: User }> {
    throw new Error('Method not implemented.');
  }
}
