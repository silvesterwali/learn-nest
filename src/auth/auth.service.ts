import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    console.log(email, 'validate user');

    if (user && (await this.comparePassword(password, user.password))) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }
    console.log('no user');
    return null;
  }

  async login(user: any) {
    const payload = { ...user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
