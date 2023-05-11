import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign]), CompanyModule],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
