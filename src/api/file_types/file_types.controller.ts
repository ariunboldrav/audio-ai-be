import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FileTypesService } from './file_types.service';
import { CreateFileTypeDto } from './dto/create-file_type.dto';
import { UpdateFileTypeDto } from './dto/update-file_type.dto';

@Controller('file-types')
export class FileTypesController {
  constructor(private readonly fileTypesService: FileTypesService) {}

  @Post()
  create(@Body() createFileTypeDto: CreateFileTypeDto) {
    return this.fileTypesService.create(createFileTypeDto);
  }

  @Get()
  findAll() {
    return this.fileTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileTypeDto: UpdateFileTypeDto) {
    return this.fileTypesService.update(+id, updateFileTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileTypesService.remove(+id);
  }
}
