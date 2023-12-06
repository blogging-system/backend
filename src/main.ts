import { configureCors } from '@src/shared/helpers'
import { appConfig } from '@src/shared/config'
import { AppModule } from './core/app.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  configureCors(app)

  await app.listen(appConfig.server.port)
}

bootstrap()
