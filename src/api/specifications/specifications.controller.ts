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
  @Post()
  async create(
    @Body() createSpecificationDto: CreateSpecificationDto,
    @Request() req,
  ) {
    const company = await this.companyService.findByUser(req.user.id);
    if (!company || company.campaigns.length == 0) {
      // console.log('Error');
      throw new HttpException(
        { message: 'Not Found Company - Forbidden' },
        HttpStatus.FORBIDDEN,
      );
    } else if (company.campaigns[0].spec == null) {
      // console.log('Insert');
      createSpecificationDto.campaign = company.campaigns[0];
      const spec = await this.specificationsService.create(
        createSpecificationDto,
      );
      throw new HttpException(spec, HttpStatus.OK);
    } else {
      // console.log('Update');
      const specId = company.campaigns[0].spec.id;
      const spec = await this.specificationsService.update(
        specId,
        createSpecificationDto,
      );
      throw new HttpException(spec, HttpStatus.OK);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOne(@Request() req) {
    const company = await this.companyService.findByUser(req.user.id);
    if (company.campaigns.length > 0) {
      if (company.campaigns[0].spec) {
        throw new HttpException(company.campaigns[0].spec, HttpStatus.OK);
      }
    } 
    throw new HttpException({message: 'Мэдээлэл олдсонгүй'}, HttpStatus.OK);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecificationDto: UpdateSpecificationDto,
  ) {
    return this.specificationsService.update(+id, updateSpecificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specificationsService.remove(+id);
  }
}
