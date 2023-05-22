import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Campaign } from '../campaign/entities/campaign.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private _companyResp: Repository<Company>,
    private _query: DataSource,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    user: User,
  ): Promise<Company> {
    const company = await this._companyResp.create();
    company.name = createCompanyDto.name;
    company.user = user;
    company.is_verified = true;
    const save = this._companyResp.save(company);
    return save;
  }

  async findAllByUser(userId: number): Promise<Company> {
    const company = await this._query.getRepository(Company).findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: [
        'campaigns',
        'campaigns.spec',
        'campaigns.content',
        'campaigns.fileAnswers',
      ],
    });
    return company;
  }

  async findByUser(userId: number): Promise<Company> {
    const company = await this._query.getRepository(Company).findOne({
      where: {
        user: {
          id: userId,
        },
      },
      relations: [
        'campaigns',
        'campaigns.spec',
        'campaigns.content',
        'campaigns.fileAnswers',
      ],
    });
    return company;
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

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);
    company.name = updateCompanyDto.name;
    const save = this._companyResp.save(company);
    return save;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
