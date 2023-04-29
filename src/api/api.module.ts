import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';
import { UserVerifyModule } from './user_verify/user_verify.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { CompanyUsersModule } from './company_users/company_users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { CompanyAnswersModule } from './company_answers/company_answers.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UserVerifyModule,
    CompaniesModule,
    CompanyUsersModule,
    QuestionsModule,
    AnswersModule,
    CompanyAnswersModule,
  ],
  providers: [JwtStrategy],
})
export class ApiModule {}
