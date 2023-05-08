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
import { FileTypesModule } from './file_types/file_types.module';
import { FilePathsModule } from './file_paths/file_paths.module';
import { FileAnswersModule } from './file_answers/file_answers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UserVerifyModule,
    CompaniesModule,
    CampaignsModule,
    SpecificationsModule,
    ContentModule,
    FileTypesModule,
    FilePathsModule,
    FileAnswersModule,
  ],
  providers: [JwtStrategy],
})
export class ApiModule {}
