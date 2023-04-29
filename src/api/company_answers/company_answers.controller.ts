import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyAnswersService } from './company_answers.service';
import { CreateCompanyAnswerDto } from './dto/create-company_answer.dto';
import { UpdateCompanyAnswerDto } from './dto/update-company_answer.dto';

@Controller('company-answers')
export class CompanyAnswersController {
  constructor(private readonly companyAnswersService: CompanyAnswersService) {}

  @Post()
  create(@Body() createCompanyAnswerDto: CreateCompanyAnswerDto) {
    return this.companyAnswersService.create(createCompanyAnswerDto);
  }

  @Get()
  findAll() {
    return this.companyAnswersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyAnswersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyAnswerDto: UpdateCompanyAnswerDto) {
    return this.companyAnswersService.update(+id, updateCompanyAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyAnswersService.remove(+id);
  }
}
