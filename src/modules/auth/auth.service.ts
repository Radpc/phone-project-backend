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

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    let user: User;

    try {
      user = await this.usersService.findByEmail(email);
      if (!user?.checkPassword(pass)) {
        throw new Error();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }

    const payload: IUserJWT = createJWTPayload(user);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
