import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ExceptionsFilter } from './shared/filters';
import { KeywordModule } from './modules/keyword/keyword.module';
import { TagModule } from './modules/tag/tag.module';
import { SeriesModule } from './modules/series/series.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectTimeoutMS: 30000,
    }),
    PostModule,
    UserModule,
    KeywordModule,
    TagModule,
    SeriesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },

    AppService,
  ],
})
export class AppModule {}
