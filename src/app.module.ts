import { PostModule } from './modules/post/post.module'
import { UserModule } from './modules/user/user.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { ExceptionsFilter } from './shared/filters'
import { KeywordModule } from './modules/keyword/keyword.module'
import { TagModule } from './modules/tag/tag.module'
import { SeriesModule } from './modules/series/series.module'
import { AuthModule } from './modules/auth/auth.module'
import { BearerTokenMiddleware } from './shared/middlewares'
import { SessionModule } from './modules/session/session.module'
import { ValidateSessionInterceptor } from './modules/session/interceptors'
import { appConfig } from './shared/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MongooseModule.forRoot(appConfig.storage.database.mongodb.uri, {
      connectTimeoutMS: 30000,
    }),
    PostModule,
    UserModule,
    KeywordModule,
    TagModule,
    SeriesModule,
    AuthModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidateSessionInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BearerTokenMiddleware).exclude('/auth/login', '/ping', '/').forRoutes('*')
  }
}
