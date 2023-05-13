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
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createContentDto: CreateContentDto, @Request() req) {
    const company = await this.companyService.findByUser(req.user.id);
    if (!company || company.campaigns.length == 0) {
      // console.log('Error');
      throw new HttpException(
        { message: 'Not Found Company - Forbidden' },
        HttpStatus.FORBIDDEN,
      );
    } else if (company.campaigns[0].content == null) {
      // console.log('Insert');
      createContentDto.campaign = company.campaigns[0];
      const content = await this.contentService.create(
        createContentDto,
      );
      throw new HttpException(content, HttpStatus.OK);
    } else {
      // console.log('Update');
      const conntetId = company.campaigns[0].content.id;
      const content = await this.contentService.update(
        conntetId,
        createContentDto,
      );
      throw new HttpException(content, HttpStatus.OK);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Request() req) {
    const company = await this.companyService.findByUser(req.user.id);
    if (company.campaigns.length > 0) {
      if (company.campaigns[0].content) {
        throw new HttpException(company.campaigns[0].content, HttpStatus.OK);
      }
    } 
    throw new HttpException({message: 'Мэдээлэл олдсонгүй'}, HttpStatus.OK);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
