import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

export interface IUserJWT {
  id: number;
  name: string;
  email: string;
}

const createJWTPayload = (user: User) => {
  return { id: user.id, name: user.name, email: user.email } as IUserJWT;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);

    if (!user.checkPassword(pass)) {
      throw new UnauthorizedException();
    }
    const payload: IUserJWT = createJWTPayload(user);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
