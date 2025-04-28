import { User as RawUser } from '../../../../generated/prisma';
import { UserDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

interface IProps {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: IProps) {
    const { createdAt, email, id, password, name, updatedAt } = props;
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromRaw(rawUser: RawUser): User {
    return new User({
      id: rawUser.id,
      createdAt: rawUser.createdAt,
      name: rawUser.name,
      email: rawUser.email,
      password: rawUser.password,
      updatedAt: rawUser.updatedAt,
    });
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  checkPassword(checkWithPassword: string): boolean {
    return bcrypt.compareSync(checkWithPassword, this.password);
  }
}
