import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  });

  app.use(helmet());
  app.use(bodyParser.text());

  await app.listen(4000);
}
bootstrap();
