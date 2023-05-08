import { Injectable } from '@nestjs/common';
import { CreateFileTypeDto } from './dto/create-file_type.dto';
import { UpdateFileTypeDto } from './dto/update-file_type.dto';

@Injectable()
export class FileTypesService {
  create(createFileTypeDto: CreateFileTypeDto) {
    return 'This action adds a new fileType';
  }

  findAll() {
    return `This action returns all fileTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileType`;
  }

  update(id: number, updateFileTypeDto: UpdateFileTypeDto) {
    return `This action updates a #${id} fileType`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileType`;
  }
}
