import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from './entities/campaign.entity';
import { DataSource, QueryBuilder, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private _campRepository: Repository<Campaign>,
    private _query: DataSource,
  ) {}

  async create(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = await this._campRepository.create();

    campaign.name = createCampaignDto.name;
    campaign.brand_name = createCampaignDto.brandName;
    campaign.company = createCampaignDto.company;
    campaign.total_budget = createCampaignDto.totalBudget;
    campaign.create_budget = createCampaignDto.createBudget;
    if (createCampaignDto.startDate) {
      campaign.when_start = new Date(createCampaignDto.startDate);
    }
    campaign.when_end = new Date(createCampaignDto.endDate);

    const save = this._campRepository.save(campaign);
    return save;
  }

  findAll() {
    return `This action returns all campaigns`;
  }

  async findByCompany(userId: number): Promise<any> {
    const campaign = await this._query
      .createQueryBuilder()
      .select('campaign.*')
      .from(User, 'user')
      .leftJoinAndMapOne(
        'user.id',
        Company,
        'company',
        'company.user_id = user.id',
      )
      .leftJoinAndMapOne(
        'company.id',
        Campaign,
        'campaign',
        'campaign.company_id = company.id',
      )
      .where('user.id = :userId', { userId })
      .getRawOne();

      return campaign
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
