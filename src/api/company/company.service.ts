import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private _companyResp: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, user: User): Promise<Company> {
    const company = await this._companyResp.create();
    company.name = createCompanyDto.name;
    company.user = user;
    company.is_verified = true;
    const save = this._companyResp.save(company);
    return save;
  }

  async findAll(user: User) {
    const companies = await this._companyResp.find();
    return companies;
  }

  findOne(id: number) {
    return this._companyResp.findOneBy({ id });
  }

  findName(name: string): Promise<Company> {
    const comp = this._companyResp.findOne({
      where: {
        name,
      },
    });

    return comp;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
