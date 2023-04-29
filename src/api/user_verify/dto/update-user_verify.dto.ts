import { PartialType } from '@nestjs/mapped-types';
import { CreateUserVerifyDto } from './create-user_verify.dto';

export class UpdateUserVerifyDto extends PartialType(CreateUserVerifyDto) {}
