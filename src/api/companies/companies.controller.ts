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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  async create(@Body() createCompanyDto: CreateCompanyDto, @Request() req) {
    const { ...userResponse } = await this.userService.findOne(req.user.id);
    if (userResponse.id) {
      throw new HttpException('No Access', HttpStatus.NOT_FOUND);
    }
    return this.companiesService.create(createCompanyDto, req.user.id);
  }

  @Get()
  async findAll(@Request() req) {
    const { ...userResponse } = await this.userService.findOne(req.user.id);
    if (userResponse.id) {
      throw new HttpException('No Access', HttpStatus.NOT_FOUND);
    }
    return this.companiesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }
}
