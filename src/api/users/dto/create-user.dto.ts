import { IsNotEmpty, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";
import { DeviceTypeEnum } from "src/common/enum/device.type.enum";

export class CreateUserDto {
    @IsNotEmpty({message: 'Та гар утасны дугаараа зөв оруулана уу!'})
    @IsPhoneNumber("US")
    phone: string

    @IsNotEmpty({message: 'Та нэрээ оруулана уу!'})
    fullName: string

    @IsNotEmpty({message: 'Та нууц үгээ оруулана уу!'})
    @MinLength(6, {message: 'Таны нууц үг доод тал 6 тэмдэг байх ёстой!'})
    password: string

    @IsNotEmpty({message: 'Та цахим шуудангийн хаягаа оруулана уу!'})
    email: string

    @IsNotEmpty({message: 'Та цахим шуудангийн хаягаа оруулана уу!'})
    compName: string
    
    deviceType: string
    deviceToken: string
}
