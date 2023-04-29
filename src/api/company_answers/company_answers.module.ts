import { Module } from '@nestjs/common';
import { CompanyAnswersService } from './company_answers.service';
import { CompanyAnswersController } from './company_answers.controller';

@Module({
  controllers: [CompanyAnswersController],
  providers: [CompanyAnswersService]
})
export class CompanyAnswersModule {}
