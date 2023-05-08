import { Module } from '@nestjs/common';
import { FileTypesService } from './file_types.service';
import { FileTypesController } from './file_types.controller';

@Module({
  controllers: [FileTypesController],
  providers: [FileTypesService]
})
export class FileTypesModule {}
