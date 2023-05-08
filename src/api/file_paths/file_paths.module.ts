import { Module } from '@nestjs/common';
import { FilePathsService } from './file_paths.service';
import { FilePathsController } from './file_paths.controller';

@Module({
  controllers: [FilePathsController],
  providers: [FilePathsService]
})
export class FilePathsModule {}
