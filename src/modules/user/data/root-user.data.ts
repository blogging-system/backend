import { appConfig } from "@src/shared/config";
import { CreateUserDto } from "../dtos";

export const rootUserPayload: Partial<CreateUserDto> = {
  firstName: appConfig.seeders.rootUser.firstName,
  lastName: appConfig.seeders.rootUser.lastName,
  userName: appConfig.seeders.rootUser.userName,
  email: appConfig.seeders.rootUser.email,
  password: appConfig.seeders.rootUser.password,
  roles: appConfig.seeders.rootUser.roles,
  isVerified: true,
  verifiedAt: new Date(),
};
