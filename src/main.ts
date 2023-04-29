import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        return new BadRequestException(validationErrors);
      },
    }),
  );

  await app.listen(port, () => {
    console.log(
      `[DATBASE_NAME]::: ${config.get<string>('DATABASE_NAME')} -- ${config.get<string>('DATABASE_SCHEMA')}`,
      `\n[BASE_URL]::: ${config.get<string>('BASE_URL')}:${config.get<string>('PORT')}`,
    );
  });
}
bootstrap();
