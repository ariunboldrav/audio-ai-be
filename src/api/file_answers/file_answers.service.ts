import { Injectable } from '@nestjs/common';
import { CreateFileAnswerDto } from './dto/create-file_answer.dto';
import { UpdateFileAnswerDto } from './dto/update-file_answer.dto';

@Injectable()
export class FileAnswersService {
  create(createFileAnswerDto: CreateFileAnswerDto) {
    return 'This action adds a new fileAnswer';
  }

  findAll() {
    return `This action returns all fileAnswers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fileAnswer`;
  }

  update(id: number, updateFileAnswerDto: UpdateFileAnswerDto) {
    return `This action updates a #${id} fileAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileAnswer`;
  }
}
