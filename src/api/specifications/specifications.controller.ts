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
} from '@nestjs/common';
import { SpecificationsService } from './specifications.service';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CampaignService } from '../campaign/campaign.service';
import { CompanyService } from '../company/company.service';

@Controller('spec')
export class SpecificationsController {
  constructor(
    private readonly specificationsService: SpecificationsService,
    private readonly campaignService: CampaignService,
    private readonly companyService: CompanyService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(
    @Body() createSpecificationDto: CreateSpecificationDto,
    @Request() req,
    @Param('id') id: number,
  ) {
    const campaign = await this.campaignService.findOne(id);
    // console.log(campaign);
    // TODO Check User
    createSpecificationDto.campaign = campaign;
    if(!campaign.spec) {
      const spec = this.specificationsService.create(createSpecificationDto);
      throw new HttpException(spec, HttpStatus.OK);
    } else {
      const spec = await this.specificationsService.update(
        +campaign.spec.id,
        createSpecificationDto,
      );
      throw new HttpException(spec, HttpStatus.OK);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    const campaign = await this.campaignService.findOne(id);
    if (campaign) {
      throw new HttpException(campaign.spec, HttpStatus.OK);
    } else {
      throw new HttpException(
        { message: 'Мэдээлэл олдсонгүй' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSpecificationDto: UpdateSpecificationDto,
  ) {
    const campaign = await this.campaignService.findOne(id);
    if (campaign.spec) {
      const spec = await this.specificationsService.update(
        +campaign.spec.id,
        updateSpecificationDto,
      );
      throw new HttpException(spec, HttpStatus.OK);
    } else {
      throw new HttpException(
        { message: 'Мэдээлэл олдсонгүй' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificationsService.remove(+id);
  }
}
