import { Injectable } from '@nestjs/common';
import { CreateFileAnswerDto } from './dto/create-file_answer.dto';
import { UpdateFileAnswerDto } from './dto/update-file_answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileAnswer } from './entities/file_answer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FileAnswersService {
  constructor(
    @InjectRepository(FileAnswer)
    private _fileRepository: Repository<FileAnswer>,
    private _query: DataSource,
  ) {}

  async create(createFileAnswerDto: CreateFileAnswerDto) {
    const fileAnswer = await this._fileRepository.create();
    fileAnswer.answer_one = createFileAnswerDto.answerOne;
    fileAnswer.answer_two = createFileAnswerDto.answerTwo;
    fileAnswer.answer_three = createFileAnswerDto.answerThree;
    fileAnswer.answer_four = createFileAnswerDto.answerFour;
    fileAnswer.campaign = createFileAnswerDto.campaign;
    const save = this._fileRepository.save(fileAnswer);
    return save;
  }

  findAll() {
    return `This action returns all fileAnswers`;
  }

  findOne(id: number) {
    const data = this._fileRepository.findOne({
      where: {
        id,
      },
      relations: ['campaign'],
    });
    return data;
  }

  async update(id: number, updateFileAnswerDto: UpdateFileAnswerDto) {
    const fileAnswer = await this.findOne(id);
    fileAnswer.answer_one = updateFileAnswerDto.answerOne;
    fileAnswer.answer_two = updateFileAnswerDto.answerTwo;
    fileAnswer.answer_three = updateFileAnswerDto.answerThree;
    fileAnswer.answer_four = updateFileAnswerDto.answerFour;
    fileAnswer.campaign = updateFileAnswerDto.campaign;
    const save = this._fileRepository.save(fileAnswer);
    return save;
  }

  remove(id: number) {
    return `This action removes a #${id} fileAnswer`;
  }
}
