import { appConfig } from "@src/shared/config";
import { CreateUserDto } from "../dtos";

export const rootUserPayload: CreateUserDto = {
  firstName: appConfig.seeders.rootUser.firstName,
  lastName: appConfig.seeders.rootUser.lastName,
  email: appConfig.seeders.rootUser.email,
  password: appConfig.seeders.rootUser.password,
};
