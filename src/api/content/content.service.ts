import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { Campaign } from '../campaign/entities/campaign.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private _contentRepository: Repository<Content>,
    private _query: DataSource,
  ) {}

  async create(createContentDto: CreateContentDto) {
    const content = await this._contentRepository.create();

    content.campaign = createContentDto.campaign;
    content.audience_feel = createContentDto.audienceFeel;
    content.character_or_tone = createContentDto.characterOrTone;
    content.comments = createContentDto.comments;
    content.features = createContentDto.features;
    content.goal = createContentDto.goal;
    content.key_messages = createContentDto.keyMessages;
    const save = this._contentRepository.save(content);

    return save;
  }

  findByCampaign(campId: number) {
    const data = this._query
      .createQueryBuilder()
      .select('*')
      .from(Content, 'content')
      .where('content.campaign_id = :campId', { campId })
      .getRawOne();

    return data;
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
