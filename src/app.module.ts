import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { KeywordModule } from './modules/keyword/keyword.module'
import { SessionModule } from './modules/session/session.module'
import { SeriesModule } from './modules/series/series.module'
import { QuoteModule } from './modules/quote/quote.module'
import { PostModule } from './modules/post/post.module'
import { Module, ValidationPipe } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { TagModule } from './modules/tag/tag.module'
import { ExceptionsFilter } from './shared/filters'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from './shared/config'
import { AppService } from './app.service'

@Module({
  imports: [
    PostModule,
    UserModule,
    KeywordModule,
    TagModule,
    SeriesModule,
    AuthModule,
    SessionModule,
    QuoteModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(appConfig.storage.database.mongodb.uri),
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
        transform: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
