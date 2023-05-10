import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';
import { UserVerifyModule } from './user_verify/user_verify.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CampaignModule } from './campaign/campaign.module';
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
    CompanyModule,
    CampaignModule,
    SpecificationsModule,
    ContentModule,
    FileTypesModule,
    FilePathsModule,
    FileAnswersModule,
  ],
  providers: [JwtStrategy],
})
export class ApiModule {}
