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

  async findAll() {
    return await this._campRepository.find();
  }

  findOne(id: number) {
    return this._campRepository.findOne({
      where: {
        id,
      },
      relations: ['spec', 'content', 'fileAnswer']
    });
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
    const campaign = await this.findOne(id);
    campaign.name = updateCampaignDto.name;
    campaign.brand_name = updateCampaignDto.brandName;
    campaign.total_budget = updateCampaignDto.totalBudget;
    campaign.create_budget = updateCampaignDto.createBudget;
    campaign.when_start = new Date(updateCampaignDto.startDate);
    campaign.when_end = new Date(updateCampaignDto.endDate);
    const save = this._campRepository.save(campaign);
    return save;
  }

  remove(id: number) {
    return `This action removes a #${id} campaign`;
  }
}
