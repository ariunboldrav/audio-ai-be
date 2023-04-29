import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyUserDto } from './create-company_user.dto';

export class UpdateCompanyUserDto extends PartialType(CreateCompanyUserDto) {}
