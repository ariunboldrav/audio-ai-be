import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FileAnswersService } from './file_answers.service';
import { CreateFileAnswerDto } from './dto/create-file_answer.dto';
import { UpdateFileAnswerDto } from './dto/update-file_answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('file-answers')
export class FileAnswersController {
  constructor(private readonly fileAnswersService: FileAnswersService) {}


  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFileAnswerDto: CreateFileAnswerDto) {
    return this.fileAnswersService.create(createFileAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.fileAnswersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileAnswersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileAnswerDto: UpdateFileAnswerDto) {
    return this.fileAnswersService.update(+id, updateFileAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileAnswersService.remove(+id);
  }
}
