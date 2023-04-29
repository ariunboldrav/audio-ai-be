import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerifyTokenDto } from '../token/dto/verify-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this._userRepository.create();

    user.username = createUserDto.userName
    user.email = createUserDto.email
    user.password = createUserDto.password
    user.phone_no = createUserDto.phoneNo

    const save = await this._userRepository.save(user);
    return { ...save };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number): Promise<User> {
    return this._userRepository.findOneBy({ id });
  }

  async findPhone(phone_no: string): Promise<User> {
    const data = await this._userRepository.findOne({
      where: {
        phone_no: phone_no,
        is_deleted: false,
        is_verified: true,
      },
    });
    return data;
  }

  async findAuthUser(dto: CreateUserDto) {
    const datas = await this._userRepository
    .findAndCount({where: [{
          username: dto.userName,
        },
        {
          phone_no: dto.phoneNo,
        },
        {
          email: dto.email,
        }
      ]});
    return datas;
  }

  findUsername(username: string): Promise<User> {
    return this._userRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this._userRepository.findOneBy({id, is_active: true});
    if(updateUserDto.newPass != null && updateUserDto.newPass === updateUserDto.confirmPass) {
      user.password = updateUserDto.newPass
    }
    const save = this._userRepository.save(user)
    return {...save};
  }

  async resetPassword(id: number, dto: VerifyTokenDto) {
    const user = await this._userRepository.findOneBy({id, is_active: true});
    if(dto.newPassword != null && dto.newPassword === dto.confirmPass) {
      user.password = dto.newPassword
    }
    const save = this._userRepository.save(user)
    return {...save};
  }

  async remove(id: number): Promise<void> {
    await this._userRepository.delete(id);
  }
}
