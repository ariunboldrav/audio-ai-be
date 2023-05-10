import {
  Controller,
  Post,
  Body,
  Patch,
  Request,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { ForgotPasswordDto } from '../users/dto/forgot-password.dto';
import { TokenService } from '../token/token.service';
import { CreateTokenDto } from '../token/dto/create-token.dto';
import { TokenTypeEnum } from 'src/common/enum/token.type.enum';
import { TokenSendTypeEnum } from 'src/common/enum/token.sendtype.enum';
import { VerifyTokenDto } from '../token/dto/verify-token.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import { CompanyService } from '../company/company.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly companyService: CompanyService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  login(@Body() dto: LoginUserDto, @Request() req) {
    return this.authService.validateUserCredentials(dto.email, dto.password);
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() dto: CreateUserDto) {
    const userResponse = await this.userService.findAuthUser(dto);
    const compResp = await this.companyService.findName(dto.compName);
    if (userResponse) {
      throw new HttpException(
        'Энэ цахим шууданг ашиглах боломжгүй байна.',
        HttpStatus.BAD_REQUEST,
      );
    } else if (compResp) {
      throw new HttpException(
        'Энэ компаний нэрийг ашиглах боломжгүй байна.',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      var newUser = await this.userService.create(dto);
      const compDto = new CreateCompanyDto();
      compDto.name = dto.compName;
      const { user, ...newComp } = await this.companyService.create(
        compDto,
        newUser,
      );
      const {password,...theUser} = newUser
      throw new HttpException(
        { user: theUser, company: newComp },
        HttpStatus.OK,
      );
    }
  }

  @Post('forgot/password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Request() req) {
    const { ...userResponse } = await this.userService.findPhone(dto.sendTo);
    if (userResponse.id != null) {
      const tokenDto = new CreateTokenDto();

      tokenDto.userId = userResponse.id;
      tokenDto.sendTo = dto.sendTo;
      tokenDto.sendType = TokenSendTypeEnum.MOBILE;
      tokenDto.type = TokenTypeEnum.FORGOT_PASSWORD;
      const tokenRecord = await this.tokenService.create(tokenDto);
      console.log('Token', tokenRecord.token);

      if (tokenRecord.token != null) {
        // TODO:
        // 1. OTP send to mobile
        throw new HttpException(
          {
            message: 'Таны бүртгэлтэй дугаарруу баталгаажуулах код илгээллээ!',
          },
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          { message: 'Ямар нэгэн юм буруу байна!' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    throw new HttpException(
      { message: 'Энэхүү дугаар бүртгэлгүй байна.' },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('reset/password/check')
  async checkResetToken(@Body() dto: VerifyTokenDto) {
    dto.type = TokenTypeEnum.FORGOT_PASSWORD;
    dto.sendType = TokenSendTypeEnum.MOBILE;
    console.log(dto);
    const { ...tokenResponse } = await this.tokenService.findTokenAndSendTo(
      dto,
    );
    if (tokenResponse.id != null && !tokenResponse.hash) {
      await this.tokenService.update(tokenResponse);
      throw new HttpException(
        {
          result: { hash: tokenResponse.hash },
          message: 'Та шинэ нууц үгээ оруулана уу!',
        },
        HttpStatus.OK,
      );
    }
    throw new HttpException(
      {
        message:
          'Ямар нэгэн юм буруу байна! Та харилцагчийн төвтэй холбогдоно уу!',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('reset/password')
  async restPass(@Body() dto: VerifyTokenDto) {
    dto.type = TokenTypeEnum.CHANGE_PASSWORD;
    dto.sendType = TokenSendTypeEnum.MOBILE;
    const { ...tokenResponse } = await this.tokenService.findHash(dto);
    const { ...userResponse } = await this.userService.findOne(
      tokenResponse.user_id,
    );
    if (tokenResponse.id != null && userResponse.id != null) {
      const user = JSON.parse(JSON.stringify(userResponse));
      await this.userService.resetPassword(tokenResponse.user_id, dto);
      throw new HttpException(
        { message: 'Таны нууц үг амжилттай шинэчлэгдлээ!' },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        { message: 'Ямар нэгэн юм буруу байна!' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('phone/verify')
  async phoneVerify(@Body() dto: VerifyTokenDto, @Request() req) {
    // dto.userId = req.user.id
    dto.sendType = TokenSendTypeEnum.MOBILE;
    dto.type = TokenTypeEnum.VERIFY_PHONE;

    const { ...tokenRecord } = await this.tokenService.findToken(dto);
    const { ...userResponse } = await this.userService.findOne(
      tokenRecord.user_id,
    );
    console.log(dto, tokenRecord, userResponse);
    if (tokenRecord.id != null && userResponse.id != null) {
      await this.tokenService.update(tokenRecord);
      userResponse.phone = tokenRecord.send_to;
      let userRecord = new User();
      userRecord = JSON.parse(JSON.stringify(userResponse));
      // await this.userService.verifyUser(userRecord)

      // if (userResponse.customer != null) {
      //   const dtoCustomer = new UpdateCustomerDto();
      //   dtoCustomer.phone = userResponse.phone
      //   await this.customerService.update(userResponse.customer.id, dtoCustomer)
      // }

      throw new HttpException(
        { message: 'Таны гар утас амжилттай баталгаажлаа.' },
        HttpStatus.OK,
      );
    }

    throw new HttpException(
      { message: 'Код буруу байна!' },
      HttpStatus.BAD_REQUEST,
    );
  }
}
