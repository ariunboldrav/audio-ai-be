import { Module } from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { SpecificationsController } from './specifications.controller';

@Module({
  controllers: [SpecificationsController],
  providers: [SpecificationsService],
  exports: [SpecificationsService]
})
export class SpecificationsModule {}
