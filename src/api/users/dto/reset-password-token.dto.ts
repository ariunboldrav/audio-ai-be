import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class ResetPasswordCheckTokenDto {
    @IsNotEmpty({message: 'Баталагаажуулах код оо оруулана уу!'})
    token: number

    phoneNo: string
}
