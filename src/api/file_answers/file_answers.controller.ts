import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileAnswersService } from './file_answers.service';
import { CreateFileAnswerDto } from './dto/create-file_answer.dto';
import { UpdateFileAnswerDto } from './dto/update-file_answer.dto';

@Controller('file-answers')
export class FileAnswersController {
  constructor(private readonly fileAnswersService: FileAnswersService) {}

  @Post()
  create(@Body() createFileAnswerDto: CreateFileAnswerDto) {
    return this.fileAnswersService.create(createFileAnswerDto);
  }

  @Get()
  findAll() {
    return this.fileAnswersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileAnswersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileAnswerDto: UpdateFileAnswerDto) {
    return this.fileAnswersService.update(+id, updateFileAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileAnswersService.remove(+id);
  }
}
