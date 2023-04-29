import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Req,
  Inject,
  ValidationPipe,
  ValidationError,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { DeviceTypeEnum } from 'src/common/enum/device.type.enum';
import { User } from '../users/entities/user.entity';
import { ForgotPasswordDto } from '../users/dto/forgot-password.dto';
import { TokenService } from '../token/token.service';
import { CreateTokenDto } from '../token/dto/create-token.dto';
import { TokenTypeEnum } from 'src/common/enum/token.type.enum';
import { TokenSendTypeEnum } from 'src/common/enum/token.sendtype.enum';
import { VerifyTokenDto } from '../token/dto/verify-token.dto';
import { ResetPasswordCheckTokenDto } from '../users/dto/reset-password-token.dto';
import { ChangePasswordDto } from '../users/dto/change-password.dto';
import { Token } from '../token/entities/token.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from '../users/dto/login-user.dto';
const DeviceDetector = require('node-device-detector');

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) { }

  @Post('login')
  async login(@Body() dto: LoginUserDto, @Request() req) {
    const data = await this.authService.validateUserCredentials(
      dto.userName,
      dto.password,
    );
    
    if (data == null) {
      throw new HttpException('Таны нууц үг эсвэл хэрэглэгчийн нэр буруу байна.', HttpStatus.BAD_REQUEST)
    } else {
      // Device Log & Token
      // const user = await this.userService.findOne(data.id);
      throw new HttpException({
        result: {
          token: await this.authService.loginWithCredentials(data)
        }, message: 'Амжилттай нэвтэрлээ та түр хүлээнэ үү'
      }, HttpStatus.OK)
    }
  }

  @Post('register')
  @HttpCode(200)
  async register(
    @Body() dto: CreateUserDto,
    @Request() req,
  ) {
    const userResponse = await this.userService.findAuthUser(dto);
    if (userResponse[1] > 0) {
      if(userResponse[0].find(x => x.username === dto.userName)) {
        throw new HttpException('Хэрэглэгчийн нэрийг ашиглах боломжгүй байна.', HttpStatus.BAD_REQUEST)
      } else if(userResponse[0].find(x => x.phone_no === dto.phoneNo)) {
        throw new HttpException('Утасны дугаарийг ашиглах боломжгүй байна.', HttpStatus.BAD_REQUEST)
      } else if(userResponse[0].find(x => x.email === dto.email)) {
        throw new HttpException('Энэ цахим шууданг ашиглах боломжгүй байна.', HttpStatus.BAD_REQUEST)
      } else {
        throw new HttpException('Ямар нэг юм буруу байна!', HttpStatus.BAD_REQUEST)
      }
    }

    const { is_deleted, ...response } = await this.userService.create(dto);

    const tokenRecord = new CreateTokenDto()
    tokenRecord.sendTo = response.phone_no
    tokenRecord.sendType = TokenSendTypeEnum.MOBILE
    tokenRecord.type = TokenTypeEnum.VERIFY_PHONE
    tokenRecord.userId = response.id
    // await this.tokenService.create(tokenRecord)

    const { id, password, isDeleted, createdAt, updatedAt, ...userRecord } = JSON.parse(JSON.stringify(response))
    throw new HttpException({ result: userRecord, message: "Амжилттай бүртгүүллээ." }, HttpStatus.OK)
  }

  @Post('forgot/password')
  async forgotPassword(@Body() dto: ForgotPasswordDto, @Request() req) {

    const { ...userResponse } = await this.userService.findPhone(dto.sendTo);
    if (userResponse.id != null) {
      const tokenDto = new CreateTokenDto();

      tokenDto.userId = userResponse.id
      tokenDto.sendTo = dto.sendTo
      tokenDto.sendType = TokenSendTypeEnum.MOBILE
      tokenDto.type = TokenTypeEnum.FORGOT_PASSWORD
      const tokenRecord = await this.tokenService.create(tokenDto);
      console.log('Token', tokenRecord.token)

      if (tokenRecord.token != null) {
        // TODO:
        // 1. OTP send to mobile 
        throw new HttpException({ message: 'Таны бүртгэлтэй дугаарруу баталгаажуулах код илгээллээ!' }, HttpStatus.OK)
      } else {
        throw new HttpException({ message: 'Ямар нэгэн юм буруу байна!' }, HttpStatus.BAD_REQUEST)
      }
    }

    throw new HttpException({ message: 'Энэхүү дугаар бүртгэлгүй байна.' }, HttpStatus.BAD_REQUEST)
  }

  @Post('reset/password/check')
  async checkResetToken(@Body() dto: VerifyTokenDto) {
    dto.type = TokenTypeEnum.FORGOT_PASSWORD
    dto.sendType = TokenSendTypeEnum.MOBILE
    console.log(dto)
    const { ...tokenResponse } = await this.tokenService.findTokenAndSendTo(dto)
    if (tokenResponse.id != null && !tokenResponse.hash) {
      await this.tokenService.update(tokenResponse)
      throw new HttpException({ result: { hash: tokenResponse.hash }, message: 'Та шинэ нууц үгээ оруулана уу!' }, HttpStatus.OK)
    }
    throw new HttpException({ message: 'Ямар нэгэн юм буруу байна! Та харилцагчийн төвтэй холбогдоно уу!' }, HttpStatus.BAD_REQUEST)
  }

  @Post('reset/password')
  async restPass(@Body() dto: VerifyTokenDto) {
    dto.type = TokenTypeEnum.CHANGE_PASSWORD
    dto.sendType = TokenSendTypeEnum.MOBILE
    const { ...tokenResponse } = await this.tokenService.findHash(dto)
    const { ...userResponse } = await this.userService.findOne(tokenResponse.user_id)
    if (tokenResponse.id != null && userResponse.id != null) {
      const user = JSON.parse(JSON.stringify(userResponse))
      await this.userService.resetPassword(tokenResponse.user_id, dto);
      throw new HttpException({message: 'Таны нууц үг амжилттай шинэчлэгдлээ!'}, HttpStatus.OK)
    } else {
      throw new HttpException({message: 'Ямар нэгэн юм буруу байна!'}, HttpStatus.BAD_REQUEST)
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('phone/verify')
  async phoneVerify(@Body() dto: VerifyTokenDto, @Request() req) {

    // dto.userId = req.user.id
    dto.sendType = TokenSendTypeEnum.MOBILE
    dto.type = TokenTypeEnum.VERIFY_PHONE

    const { ...tokenRecord } = await this.tokenService.findToken(dto);
    const { ...userResponse } = await this.userService.findOne(tokenRecord.user_id)
    console.log(dto, tokenRecord, userResponse)
    if (tokenRecord.id != null && userResponse.id != null) {
      await this.tokenService.update(tokenRecord)
      userResponse.phone_no = tokenRecord.send_to
      let userRecord = new User();
      userRecord = JSON.parse(JSON.stringify(userResponse))
      // await this.userService.verifyUser(userRecord)

      // if (userResponse.customer != null) {
      //   const dtoCustomer = new UpdateCustomerDto();
      //   dtoCustomer.phone_no = userResponse.phone_no
      //   await this.customerService.update(userResponse.customer.id, dtoCustomer)
      // }

      throw new HttpException({ message: 'Таны гар утас амжилттай баталгаажлаа.' }, HttpStatus.OK)
    }

    throw new HttpException({ message: 'Код буруу байна!' }, HttpStatus.BAD_REQUEST)
  }
}
