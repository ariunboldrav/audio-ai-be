import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyAnswerDto } from './create-company_answer.dto';

export class UpdateCompanyAnswerDto extends PartialType(CreateCompanyAnswerDto) {}
