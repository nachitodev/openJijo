import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import getConfig from './config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });
  app.use(cookieParser(getConfig().cookieSecret));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(getConfig().port);
}
bootstrap();
