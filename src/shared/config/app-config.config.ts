import * as dotenv from 'dotenv'
import { AppConfig } from '../interfaces'
import { EnvironmentType } from '../constants'
import { ExpiryDuration } from '../enums'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const appConfig: AppConfig = {
  environment: {
    env:
      (process.env.NODE_ENV as EnvironmentType.DEVELOPMENT) ||
      (process.env.NODE_ENV as EnvironmentType.TEST) ||
      (process.env.NODE_ENV as EnvironmentType.PRODUCTION),
  },
  server: { host: 'http://localhost', port: 3000 },
  storage: {
    database: { mongodb: { uri: process.env.MONGO_URI } },
  },
  clients: {
    portfolio: 'https://www.ahmedelgaidi.com',
    blog: 'https://blog.ahmedelgaidi.com',
    admin: 'https://dashboard.ahmedelgaidi.com',
  },
  encryptionKeys: { otp: process.env.OTP_ENCRYPTION_KEY },
  tokenSecrets: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: ExpiryDuration.TWELVE_HOURS,
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: ExpiryDuration.TWENTY_FOUR_HOURS,
    },
  },
  seeders: {
    rootUser: {
      firstName: 'Ahmed',
      lastName: 'Elgaidi',
      email: 'test@gmail.com',
      password: process.env.ROOT_USER_PASSWORD,
    },
  },
}
