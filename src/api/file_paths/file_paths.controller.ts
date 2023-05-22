import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FilePathsService } from './file_paths.service';
import { CreateFilePathDto } from './dto/create-file_path.dto';
import { UpdateFilePathDto } from './dto/update-file_path.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('file-paths')
export class FilePathsController {
  constructor(private readonly filePathsService: FilePathsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFilePathDto: CreateFilePathDto) {
    return this.filePathsService.create(createFilePathDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.filePathsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filePathsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilePathDto: UpdateFilePathDto) {
    return this.filePathsService.update(+id, updateFilePathDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filePathsService.remove(+id);
  }
}
