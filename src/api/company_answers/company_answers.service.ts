import { Injectable } from '@nestjs/common';
import { CreateCompanyAnswerDto } from './dto/create-company_answer.dto';
import { UpdateCompanyAnswerDto } from './dto/update-company_answer.dto';

@Injectable()
export class CompanyAnswersService {
  create(createCompanyAnswerDto: CreateCompanyAnswerDto) {
    return 'This action adds a new companyAnswer';
  }

  findAll() {
    return `This action returns all companyAnswers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyAnswer`;
  }

  update(id: number, updateCompanyAnswerDto: UpdateCompanyAnswerDto) {
    return `This action updates a #${id} companyAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyAnswer`;
  }
}
