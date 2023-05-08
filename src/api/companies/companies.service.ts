import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CompaniesService {
  
  constructor(
    @InjectRepository(Company)
    private _companyResp: Repository<Company>,
  ) {}
  
  async create(createCompanyDto: CreateCompanyDto, userId: number) {
    const company = this._companyResp.create();
    company.name = createCompanyDto.name;
    company.user_id = userId
    company.is_verified = true

    const save = await this._companyResp.save(company)
    return {...save};
  }
  
  async findAll(userId: number) {
    const companies = await this._companyResp.find({
      where: {
        user_id: userId
      }
    })
    return companies;
  }

  findOne(id: number) {
    return this._companyResp.findOneBy({ id });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
