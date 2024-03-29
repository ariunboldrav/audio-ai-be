import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async validateUserCredentials(email: string, password: string): Promise<any> {
    const user = await this.userService.findEmail(email);
    if (!user) {
      throw new HttpException(
        {
          token: null,
          message: 'Таны нууц үг эсвэл хэрэглэгчийн нэр буруу байна.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    var userPassword = user.password;
    var userId = user.id;
    const isMatch = await bcrypt.compare(password, userPassword);
    if (user && isMatch) {
      return {
        token: this.loginWithCredentials(userId),
      };
    }
    throw new HttpException(
      {
        token: null,
        message: 'Таны нууц үг эсвэл хэрэглэгчийн нэр буруу байна.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  loginWithCredentials(userId: number) {
    const payload = { id: userId };
    return this.jwtTokenService.sign(payload);
  }
}
