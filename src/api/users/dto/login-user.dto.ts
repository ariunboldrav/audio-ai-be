import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from "class-validator";
import { DeviceTypeEnum } from "src/common/enum/device.type.enum";

export class LoginUserDto {
    @IsNotEmpty({message: 'Та нэвтрэх нэрээ оруулана уу!'})
    @MinLength(6, {message: 'Нэвтрэх нэр доод тал 6 тэмдэг байх ёстой!'})
    userName: string

    @IsNotEmpty({message: 'Та нууц үгээ оруулана уу!'})
    @MinLength(6, {message: 'Таны нууц үг доод тал 6 тэмдэг байх ёстой!'})
    password: string

    deviceType: string
    deviceToken: string
}
