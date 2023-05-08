import { PartialType } from '@nestjs/mapped-types';
import { CreateFileAnswerDto } from './create-file_answer.dto';

export class UpdateFileAnswerDto extends PartialType(CreateFileAnswerDto) {}
