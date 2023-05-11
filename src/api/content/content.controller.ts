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
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignService } from '../campaign/campaign.service';

@Controller('content')
export class ContentController {
  constructor(
    private readonly contentService: ContentService,
    private readonly campaignService: CampaignService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createContentDto: CreateContentDto, @Request() req) {
    const campaign = await this.campaignService.findByCompany(req.user.id);
    const data = await this.contentService.findByCampaign(campaign.id);
    if (!data.content_id) {
      const content = await this.contentService.create(createContentDto);
      return content;
    }
    return data;
  }

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
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
