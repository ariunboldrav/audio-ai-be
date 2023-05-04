import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';
import { UserVerifyModule } from './user_verify/user_verify.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { SpecificationsModule } from './specifications/specifications.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UserVerifyModule,
    CompaniesModule,
    CampaignsModule,
    SpecificationsModule,
    ContentModule,
  ],
  providers: [JwtStrategy],
})
export class ApiModule {}
