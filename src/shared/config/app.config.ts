import { EnvironmentType, ExpiryDuration } from "@src/shared/contracts/enums";
import { AppConfig } from "@src/shared/contracts/interfaces";
import { ROLES } from "@src/modules/user/enums";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const appConfig: AppConfig = {
  environment: {
    env:
      (process.env.NODE_ENV as EnvironmentType.DEVELOPMENT) ||
      (process.env.NODE_ENV as EnvironmentType.TEST) ||
      (process.env.NODE_ENV as EnvironmentType.PRODUCTION),
  },
  server: { host: "http://localhost", port: 3000 },
  client: { baseUrl: "http://localhost", port: 3001 },
  storage: {
    database: {
      mongodb: { uri: process.env.MONGO_URI },
    },
  },
  allowedOrigins: ["https://www.ahmedelgaidi.com", "https://blog.ahmedelgaidi.com", "https://admin.ahmedelgaidi.com"],
  encryptionKeys: { otp: process.env.OTP_ENCRYPTION_KEY },
  tokenSecrets: {
    verificationToken: {
      secret: process.env.VERIFICATION_TOKEN_SECRET,
      expiresIn: ExpiryDuration.EIGHT_HOURS,
    },
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
      firstName: "Ahmed",
      lastName: "Elgaidi",
      userName: "elbotanist",
      email: "test@gmail.com",
      password: process.env.ROOT_USER_PASSWORD,
      roles: [ROLES.OWNER],
    },
  },
};
