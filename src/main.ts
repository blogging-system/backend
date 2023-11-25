import { appConfig } from './shared/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  appConfig.environment.env === 'development'
    ? app.enableCors()
    : app.enableCors({
        origin: Object.values(appConfig.clients),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      })

  await app.listen(appConfig.server.port)
}
bootstrap()
