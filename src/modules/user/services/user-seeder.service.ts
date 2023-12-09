import { UserService } from "./user.service";
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos";

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  public async seedRootUser(data: Partial<CreateUserDto>): Promise<void> {
    const isUserFound = await this.userService.isUserFound({ email: data.email });

    if (isUserFound) return;

    await this.userService.createUser(data);
  }
}
