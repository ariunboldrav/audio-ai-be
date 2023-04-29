import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserVerifyService } from './user_verify.service';
import { CreateUserVerifyDto } from './dto/create-user_verify.dto';
import { UpdateUserVerifyDto } from './dto/update-user_verify.dto';

@Controller('user-verify')
export class UserVerifyController {
  constructor(private readonly userVerifyService: UserVerifyService) {}

  @Post()
  create(@Body() createUserVerifyDto: CreateUserVerifyDto) {
    return this.userVerifyService.create(createUserVerifyDto);
  }

  @Get()
  findAll() {
    return this.userVerifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userVerifyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserVerifyDto: UpdateUserVerifyDto) {
    return this.userVerifyService.update(+id, updateUserVerifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userVerifyService.remove(+id);
  }
}
