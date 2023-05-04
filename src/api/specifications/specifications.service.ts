import { Injectable } from '@nestjs/common';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import { UpdateSpecificationDto } from './dto/update-specification.dto';

@Injectable()
export class SpecificationsService {
  create(createSpecificationDto: CreateSpecificationDto) {
    return 'This action adds a new specification';
  }

  findAll() {
    return `This action returns all specifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specification`;
  }

  update(id: number, updateSpecificationDto: UpdateSpecificationDto) {
    return `This action updates a #${id} specification`;
  }

  remove(id: number) {
    return `This action removes a #${id} specification`;
  }
}
