import { PaginatedQuery } from '../../../utils/pagination-types';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export type ICreateUser = CreateUserDto;
export type IUpdateUser = UpdateUserDto;

export type IListUsersParams = PaginatedQuery;

export interface UsersRepoInterface {
  create(payload: ICreateUser): Promise<{ data: User }>;
  update(userId: number, payload: IUpdateUser): Promise<{ data: User }>;
  get(userId: number): Promise<{ data: User }>;
  getByEmail(email: string): Promise<{ data: User }>;
  list(params: IListUsersParams): Promise<{ data: User[]; total: number }>;
  delete(userId: number): Promise<{ data: User }>;
}
