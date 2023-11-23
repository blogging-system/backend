import { EnvironmentType } from '../constants';

export interface AppConfig {
  environment: {
    env:
      | EnvironmentType.DEVELOPMENT
      | EnvironmentType.TEST
      | EnvironmentType.PRODUCTION;
  };
  server: { host: 'http://localhost'; port: 3000 };
  storage: {
    database: { mongodb: { uri: string } };
  };
  clients: {
    portfolio: string;
    blog: string;
    admin: string;
  };
  encryptionKeys: { otp: string };
  tokenSecrets: {
    accessToken: {
      secret: string;
      expiresIn: string;
    };
    refreshToken: {
      secret: string;
      expiresIn: string;
    };
  };
  seeders: {
    rootUser: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };
  };
}
