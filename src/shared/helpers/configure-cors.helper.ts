import { INestApplication } from '@nestjs/common'
import { EnvironmentType } from '../enums'
import { appConfig } from '../config'

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
