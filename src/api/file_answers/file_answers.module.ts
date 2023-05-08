import { Module } from '@nestjs/common';
import { FileAnswersService } from './file_answers.service';
import { FileAnswersController } from './file_answers.controller';

@Module({
  controllers: [FileAnswersController],
  providers: [FileAnswersService]
})
export class FileAnswersModule {}
