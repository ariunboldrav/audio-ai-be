import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { TokenTypeEnum } from 'src/common/enum/token.type.enum';
import { TokenSendTypeEnum } from 'src/common/enum/token.sendtype.enum';
import { Repository } from 'typeorm';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { Token } from './entities/token.entity';
import * as bcrypt from 'bcrypt'
import * as moment from 'moment';
@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly repo: Repository<Token>
  ) { }

  async create(dto: CreateTokenDto) {
    switch (dto.sendType) {
      case TokenSendTypeEnum.EMAIL:
        console.log('sendEmail')
        break;
      default:
        console.log('sendPhone')
        break;
    }

    const data = this.repo.create()
    data.send_type = dto.sendType
    data.send_to = dto.sendTo
    data.type = dto.type
    data.user_id = dto.userId
    data.token = Math.floor(100000 + Math.random() * 900000).toString()

    // const saltRounds = parseInt(process.env.HASH_SALT);
    // data.hash = await bcrypt.hash(data.token, saltRounds)

    // await axios.post('https://sms.mandalasset.mn/send', {
    //   phone: data.sendTo,
    //   sms: data.token
    // }).then((resp) => {
    //   console.log(resp.data)
    // })

    const save = await this.repo.save(data)

    return save;
  }

  async findToken(dto: VerifyTokenDto): Promise<Token> {
    const data = await this.repo.findOne({
      where: {
        // userId: dto.userId,
        token: dto.token,
        send_type: dto.sendType,
        type: dto.type,
        is_verified: false
      }
    });

    return data
  }

  async findHash(dto: VerifyTokenDto): Promise<Token> {
    const data = await this.repo.findOne({
      where: {
        // userId: dto.userId,
        token: dto.token,
        hash: dto.hash,
        send_type: dto.sendType,
        type: dto.type,
        // isVerified: false
      }
    });

    return data
  }

  async findTokenAndSendTo(dto: VerifyTokenDto): Promise<Token> {
    const data = await this.repo.findOne({
      where: {
        // userId: dto.userId,
        send_to: dto.sendTo,
        token: dto.token,
        send_type: dto.sendType,
        type: dto.type,
        is_verified: false,
        hash: null
      }
    });

    return data
  }

  async findOne(token: string): Promise<Token> {
    const data = await this.repo.findOne({
      where: {
        token: token
      }
    })
    return data
  }

  async update(token: Token) {
    token.is_verified = true
    const saltRounds = parseInt(process.env.HASH_SALT);
    console.log(token)
    const hashData = `{
      token: ${token.token},
      createdAt: ${moment(token.created_at).add(30, 'm').unix()}
    }`
    token.hash = await bcrypt.hash(hashData.toString(), saltRounds)
    await this.repo.update(token.id, token)
  }

  remove(id: number) {
    return `This action removes a #${id} token`;
  }
}
