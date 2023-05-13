import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsNotEmpty({ message: 'Та Заавал нууц үгээ оруулана уу!' })
  // currentPass: string;

  @IsNotEmpty({ message: 'Та өөрийн нэрээ оруулана уу!' })
  fullName: string;

  @IsNotEmpty({ message: 'Та гар утасны дугаараа оруулана уу!' })
  phone: string;

  @IsNotEmpty({ message: 'Та гар Цахим шуудан оруулана уу!' })
  email: string;
  @IsNotEmpty({ message: 'Та гар Компаны нэр оруулана уу!' })
  compName: string;

  compDesc: string;

  newPass: string;
  confirmPass: string;
}
