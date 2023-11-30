import { configureCors } from '@src/shared/helpers'
import { appConfig } from '@src/shared/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  configureCors(app)

  await app.listen(appConfig.server.port)
}

bootstrap()
