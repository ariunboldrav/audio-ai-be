import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyService } from '../company/company.service';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly companyService: CompanyService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createCampaignDto: CreateCampaignDto) {
    // console.log(req.user.id)
    const company = await this.companyService.findByUser(req.user.id);
    createCampaignDto.company = company;
    const data = await this.campaignService.findByCompany(req.user.id);
    if (!data.campaign_id) {
      const campaign = await this.campaignService.create(createCampaignDto);
      return campaign;
    }
    return data;
    // return this.campaignService.create(createCampaignDto);
  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(+id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(+id);
  }
}
