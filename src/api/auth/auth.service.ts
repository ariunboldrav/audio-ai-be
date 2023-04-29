import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  @Inject(UsersService)
  private readonly userService: UsersService;
  @Inject(JwtService)
  private readonly jwtTokenService: JwtService;
  // constructor(
  //   private jwtTokenService: JwtService
  // ) { }

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.userService.findUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    const payload = { id: user.id, sub: user.customer };
    return this.jwtTokenService.sign(payload);
  }
}
