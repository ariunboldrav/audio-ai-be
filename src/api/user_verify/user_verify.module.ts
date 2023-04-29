import { Module } from '@nestjs/common';
import { UserVerifyService } from './user_verify.service';
import { UserVerifyController } from './user_verify.controller';

@Module({
  controllers: [UserVerifyController],
  providers: [UserVerifyService]
})
export class UserVerifyModule {}
