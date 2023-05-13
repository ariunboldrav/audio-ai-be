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

    content.content = createContentDto.content;
    content.desired = createContentDto.desired;
    content.campaign = createContentDto.campaign;
    content.audience_feel = createContentDto.audienceFeel;
    content.comments = createContentDto.comments;
    content.features = createContentDto.features;
    content.goal = createContentDto.goal;
    content.key_messages = createContentDto.keyMessages;
    content.hope = createContentDto.hope;
    content.style_adv = createContentDto.styleAdv;
    content.guideline_tone = createContentDto.guidelineTone;
    content.target_audience = createContentDto.targetAudience;
    const save = this._contentRepository.save(content);

    return save;
  }

  findAll() {
    return `This action returns all content`;
  }

  findOne(id: number) {
    const data = this._contentRepository.findOne({
      where: {
        id,
      },
      relations: ['campaign']
    });
    return data;
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    const content = await this.findOne(id);

    content.audience_feel = updateContentDto.audienceFeel;
    content.content = updateContentDto.content;
    content.desired = updateContentDto.desired;
    content.audience_feel = updateContentDto.audienceFeel;
    content.comments = updateContentDto.comments;
    content.features = updateContentDto.features;
    content.goal = updateContentDto.goal;
    content.key_messages = updateContentDto.keyMessages;
    content.hope = updateContentDto.hope;
    content.style_adv = updateContentDto.styleAdv;
    content.guideline_tone = updateContentDto.guidelineTone;
    content.target_audience = updateContentDto.targetAudience;
    const save = this._contentRepository.save(content);

    return save;

    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
