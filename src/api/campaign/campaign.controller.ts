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
  HttpException,
  HttpStatus,
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
    const company = await this.companyService.findByUser(req.user.id);
    if (company && company.campaigns.length > 0) {
      const campaign = await this.campaignService.update(
        company.campaigns[0].id,
        createCampaignDto,
      );
      throw new HttpException(campaign, HttpStatus.OK);
    } else if (company && company.campaigns.length == 0) {
      createCampaignDto.company = company;
      const campaign = await this.campaignService.create(createCampaignDto);
      throw new HttpException(campaign, HttpStatus.OK);
    } else {
      throw new HttpException(
        { message: "You don't have any access", company },
        HttpStatus.FORBIDDEN,
      );
    }
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
