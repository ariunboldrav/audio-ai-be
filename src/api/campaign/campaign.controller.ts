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
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Controller('campaign')
export class CampaignController {
  constructor(
    private readonly campaignService: CampaignService,
    private readonly companyService: CompanyService,
    private readonly userService: UsersService
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

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll(@Request() req) {
    const user = await this.userService.findOne(req.user.id);
    if(user.studio) {
      return await this.campaignService.findAll()
    }

    const company = await this.companyService.findByUser(req.user.id);

    return company.campaigns
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Request() req) {
    const company = await this.companyService.findByUser(req.user.id);
    return company;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneId(@Request() req, @Param('id') id: number) {
    const company = await this.companyService.findByUser(req.user.id);
    const campaign = await this.campaignService.findOne(id)
    return campaign;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(+id, updateCampaignDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(+id);
  }
}
