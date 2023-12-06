import { INestApplication } from '@nestjs/common'
import { appConfig } from '../config'
import { EnvironmentType } from '../enums'

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
