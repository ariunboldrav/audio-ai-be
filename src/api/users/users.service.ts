import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerifyTokenDto } from '../token/dto/verify-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this._userRepository.create();
    user.full_name = createUserDto.fullName;
    user.email = createUserDto.email;
    // user.password = createUserDto.password;
    const saltRounds = 10;
    user.password = await bcrypt.hash(createUserDto.password, saltRounds);
    user.phone = createUserDto.phone;
    user.studio = createUserDto.studio
    const newUser = await this._userRepository.save(user);
    return { ...newUser };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number): Promise<User> {
    const user = this._userRepository.findOne({ 
      where: {
        id
      },
      relations: ['companies']
     });
    return user;
  }

  findPhone(phone: string): Promise<User> {
    const data = this._userRepository.findOne({
      where: {
        phone: phone,
        is_deleted: false,
        is_verified: true,
      },
    });
    return data;
  }

  findAuthUser(dto: CreateUserDto): Promise<User> {
    return this._userRepository.findOne({
      where: { email: dto.email },
    });
  }

  findEmail(email: string): Promise<User> {
    return this._userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this._userRepository.findOneBy({ id, is_active: true });
    // if (
    //   updateUserDto.newPass != null &&
    //   updateUserDto.newPass === updateUserDto.confirmPass
    // ) {
    //   user.password = updateUserDto.newPass;
    // }
    user.full_name = updateUserDto.fullName
    user.phone = updateUserDto.phone
    user.email = updateUserDto.email
    const save = this._userRepository.save(user);
    return { ...save };
  }

  async resetPassword(id: number, dto: VerifyTokenDto) {
    const user = await this._userRepository.findOneBy({ id, is_active: true });
    if (dto.newPassword != null && dto.newPassword === dto.confirmPass) {
      user.password = dto.newPassword;
    }
    const save = this._userRepository.save(user);
    return { ...save };
  }

  async remove(id: number): Promise<void> {
    await this._userRepository.delete(id);
  }
}
