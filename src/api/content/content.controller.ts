import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignService } from '../campaign/campaign.service';
import { CompanyService } from '../company/company.service';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly companyService: CompanyService,
    private readonly campaignService: CampaignService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(
    @Body() createContentDto: CreateContentDto,
    @Request() req,
    @Param('id') id: number,
  ) {
    const campaign = await this.campaignService.findOne(id);
    // console.log(campaign);
    // TODO Check User
    createContentDto.campaign = campaign;
    if (!campaign.content) {
      const content = this.contentService.create(createContentDto);
      throw new HttpException(content, HttpStatus.OK);
    } else {
      const content = await this.contentService.update(
        +campaign.content.id,
        createContentDto,
      );
      throw new HttpException(content, HttpStatus.OK);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    const campaign = await this.campaignService.findOne(id);
    if (campaign) {
      throw new HttpException(campaign.content, HttpStatus.OK);
    } else {
      throw new HttpException(
        { message: 'Мэдээлэл олдсонгүй' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
