import { EnvironmentType } from '../enums'

export interface AppConfig {
  environment: {
    env: EnvironmentType.DEVELOPMENT | EnvironmentType.TEST | EnvironmentType.PRODUCTION
  }
  server: { host: string; port: number }
  storage: {
    database: {
      mongodb: { uri: string }
    }
  }
  allowedOrigins: string[]
  encryptionKeys: { otp: string }
  tokenSecrets: {
    accessToken: {
      secret: string
      expiresIn: string
    }
    refreshToken: {
      secret: string
      expiresIn: string
    }
  }
  seeders: {
    rootUser: {
      firstName: string
      lastName: string
      email: string
      password: string
    }
  }
}