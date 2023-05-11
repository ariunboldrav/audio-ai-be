import { Module } from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { SpecificationsController } from './specifications.controller';
import { CampaignModule } from '../campaign/campaign.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specification } from './entities/specification.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Specification]),
    CompanyModule,
    CampaignModule
  ],
  controllers: [SpecificationsController],
  providers: [SpecificationsService],
  exports: [SpecificationsService]
})
export class SpecificationsModule {}
