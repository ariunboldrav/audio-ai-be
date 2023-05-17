import { Injectable } from '@nestjs/common';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Specification } from './entities/specification.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SpecificationsService {
  constructor(
    @InjectRepository(Specification)
    private _specRepository: Repository<Specification>,
    private _query: DataSource,
  ) {}

  async create(dto: CreateSpecificationDto) {
    const spec = await this._specRepository.create();

    spec.campaign = dto.campaign;

    spec.media = dto.media;
    spec.banner_size = dto.bannerSize;
    spec.banner_freq = dto.bannerFreq ? dto.bannerFreq : 0;
    spec.seconds = dto.seconds;
    spec.seconds_freq = dto.secondsFreq ? dto.secondsFreq : 0;
    spec.logo_size = dto.logoSize;
    spec.logo_freq = dto.logoFreq ? dto.logoFreq : 0;

    const data = this._specRepository.save(spec);
    return data;
  }

  findAll() {
    return `This action returns all specifications`;
  }

  findOne(id: number) {
    return this._specRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateSpecificationDto: UpdateSpecificationDto) {
    const spec = await this.findOne(id);
    spec.media = updateSpecificationDto.media;
    spec.banner_size = updateSpecificationDto.bannerSize;
    spec.banner_freq = updateSpecificationDto.bannerFreq;
    spec.seconds = updateSpecificationDto.seconds;
    spec.seconds_freq = updateSpecificationDto.secondsFreq;
    spec.logo_size = updateSpecificationDto.logoSize;
    spec.logo_freq = updateSpecificationDto.logoFreq;

    const data = this._specRepository.save(spec);

    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} specification`;
  }
}
