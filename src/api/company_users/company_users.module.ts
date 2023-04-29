import { Module } from '@nestjs/common';
import { CompanyUsersService } from './company_users.service';
import { CompanyUsersController } from './company_users.controller';

@Module({
  controllers: [CompanyUsersController],
  providers: [CompanyUsersService]
})
export class CompanyUsersModule {}
