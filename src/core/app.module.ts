import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { KeywordModule } from '../domain/modules/keyword/keyword.module'
import { SessionModule } from '../domain/modules/session/session.module'
import { SeriesModule } from '../domain/modules/series/series.module'
import { QuoteModule } from '../domain/modules/quote/quote.module'
import { PostModule } from '../domain/modules/post/post.module'
import { UserModule } from '../domain/modules/user/user.module'
import { AuthModule } from '../domain/modules/auth/auth.module'
import { TagModule } from '../domain/modules/tag/tag.module'
import { ExceptionsFilter } from '@src/infrastructure/filters'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './controllers/app.controller'
import { ConfigModule } from '@nestjs/config'
import { appConfig } from '@src/shared/config'
import { AppService } from './services/app.service'
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
