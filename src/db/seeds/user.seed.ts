import { Prisma } from '../../../generated/prisma';
import * as bcrypt from 'bcrypt';

const hashPassword = (value: string) => bcrypt.hashSync(value, 10);

export const userSeed: Prisma.UserCreateManyInput[] = [
  { name: 'User A', email: 'userA@email.com', password: hashPassword('123') },
  { name: 'User B', email: 'userB@email.com', password: hashPassword('456') },
  { name: 'User C', email: 'userC@email.com', password: hashPassword('789') },
];
