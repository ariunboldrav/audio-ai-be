import { Module } from '@nestjs/common';
import { FileAnswersService } from './file_answers.service';
import { FileAnswersController } from './file_answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileAnswer } from './entities/file_answer.entity';
import { CampaignModule } from '../campaign/campaign.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileAnswer]),
    CampaignModule,
    UsersModule,
  ],
  controllers: [FileAnswersController],
  providers: [FileAnswersService],
})
export class FileAnswersModule {}
