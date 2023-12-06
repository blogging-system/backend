import { EnvironmentType } from '@src/shared/contracts/enums'
import { INestApplication } from '@nestjs/common'
import { appConfig } from '@src/shared/config'

export const configureCors = (app: INestApplication): void => {
  appConfig.environment.env === EnvironmentType.PRODUCTION
    ? app.enableCors({
        origin: appConfig.allowedOrigins,
        methods: ['GET', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    : app.enableCors()
}
