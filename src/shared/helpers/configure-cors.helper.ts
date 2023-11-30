import { INestApplication, UnauthorizedException } from '@nestjs/common'
import { EnvironmentType } from '../enums'
import { appConfig } from '../config'

export const configureCors = (app: INestApplication): void => {
  appConfig.environment.env === EnvironmentType.PRODUCTION
    ? app.enableCors({
        origin: (origin, cb) => {
          if (appConfig.allowedOrigins.includes(origin)) {
            cb(null, origin)
          } else {
            throw new UnauthorizedException('Not Allowed origins!')
          }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: true,
        credentials: true,
      })
    : app.enableCors()
}
