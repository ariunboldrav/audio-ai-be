import { PartialType } from '@nestjs/mapped-types';
import { CreateFilePathDto } from './create-file_path.dto';

export class UpdateFilePathDto extends PartialType(CreateFilePathDto) {}
