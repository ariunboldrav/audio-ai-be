import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty({message: 'Та Заавал нууц үгээ оруулана уу!'})
    currentPass: string

    @IsNotEmpty({message: 'Та өөрийн нэрээ оруулана уу!'})
    firstName: string

    @IsNotEmpty({message: 'Та овогоо оруулана уу!'})
    lastName: string

    @IsNotEmpty({message: 'Та регистрийн дугаараа оруулана уу!'})
    @Length(9, 10, {message: 'Та регистрийн дугаараа зөв оруулана уу!'})
    regNo: string

    @IsNotEmpty({message: 'Та гар утасны дугаараа оруулана уу!'})
    @Length(7, 8, {message: 'Та гар утасны дугаараа зөв оруулана уу!'})
    phoneNo: string

    email: string

    newPass: string
    confirmPass: string
}
