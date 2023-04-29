import { Injectable } from '@nestjs/common';
import { CreateUserVerifyDto } from './dto/create-user_verify.dto';
import { UpdateUserVerifyDto } from './dto/update-user_verify.dto';

@Injectable()
export class UserVerifyService {
  create(createUserVerifyDto: CreateUserVerifyDto) {
    return 'This action adds a new userVerify';
  }

  findAll() {
    return `This action returns all userVerify`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userVerify`;
  }

  update(id: number, updateUserVerifyDto: UpdateUserVerifyDto) {
    return `This action updates a #${id} userVerify`;
  }

  remove(id: number) {
    return `This action removes a #${id} userVerify`;
  }
}
