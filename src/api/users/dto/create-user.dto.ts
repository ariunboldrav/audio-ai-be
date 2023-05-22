import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";
import { DeviceTypeEnum } from "src/common/enum/device.type.enum";

export class CreateUserDto {
    @IsNotEmpty({message: 'JPN-Required!'})
    // @IsPhoneNumber("US")
    phone: string

    @IsNotEmpty({message: 'JPN-Required!'})
    fullName: string

    @IsNotEmpty({message: 'JPN-Required!'})
    @MinLength(6, {message: 'Minimum length is 6!'})
    password: string

    @IsNotEmpty({message: 'JPN-Required!'})
    email: string

    @IsNotEmpty({message: 'JPN-Required!'})
    compName: string
    
    deviceType: string
    deviceToken: string
    @IsOptional()
    studio: boolean
}
