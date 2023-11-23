import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './shared/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      appConfig.environment.env === 'development'
        ? '*'
        : Object.values(appConfig.clients),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
