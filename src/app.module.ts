import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { KeywordModule } from './app/keyword/keyword.module'
import { SessionModule } from './app/session/session.module'
import { SeriesModule } from './app/series/series.module'
import { QuoteModule } from './app/quote/quote.module'
import { PostModule } from './app/post/post.module'
import { UserModule } from './app/user/user.module'
import { AuthModule } from './app/auth/auth.module'
import { TagModule } from './app/tag/tag.module'
import { ExceptionsFilter } from '@src/shared/filters'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from '@src/shared/config'
import { AppService } from './app.service'
import * as compression from 'compression'
import helmet from 'helmet'
import * as hpp from 'hpp'

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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(compression()).forRoutes('*')
    consumer.apply(helmet()).forRoutes('*')
    consumer.apply(hpp()).forRoutes('*')
  }
}
