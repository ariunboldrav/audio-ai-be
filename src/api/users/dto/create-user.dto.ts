import { IsNotEmpty, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";
import { DeviceTypeEnum } from "src/common/enum/device.type.enum";

export class CreateUserDto {
    @IsNotEmpty({message: 'Та гар утасны дугаараа зөв оруулана уу!'})
    @IsPhoneNumber("US")
    phoneNo: string

    @IsNotEmpty({message: 'Та нууц үгээ оруулана уу!'})
    @MinLength(6, {message: 'Таны нууц үг доод тал 6 тэмдэг байх ёстой!'})
    password: string

    @IsNotEmpty({message: 'Та гар утасны дугаараа оруулана уу!'})
    email: string
    deviceType: string
    deviceToken: string
}
