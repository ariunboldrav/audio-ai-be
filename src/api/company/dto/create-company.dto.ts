import { IsNotEmpty } from "class-validator";
import { User } from "src/api/users/entities/user.entity";

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'JPN-Required!' })
  name: string;
  desc: string;

  // userId: number;
  user: any
}
