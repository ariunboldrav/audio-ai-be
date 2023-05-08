import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilePathsService } from './file_paths.service';
import { CreateFilePathDto } from './dto/create-file_path.dto';
import { UpdateFilePathDto } from './dto/update-file_path.dto';

@Controller('file-paths')
export class FilePathsController {
  constructor(private readonly filePathsService: FilePathsService) {}

  @Post()
  create(@Body() createFilePathDto: CreateFilePathDto) {
    return this.filePathsService.create(createFilePathDto);
  }

  @Get()
  findAll() {
    return this.filePathsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filePathsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilePathDto: UpdateFilePathDto) {
    return this.filePathsService.update(+id, updateFilePathDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filePathsService.remove(+id);
  }
}
