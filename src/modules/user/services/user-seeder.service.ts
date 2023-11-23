import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  async seedRootUser(data: CreateUserDto): Promise<void> {
    const isRootUserFound = await this.userService.isUserFound(data.email);

    if (isRootUserFound) return;

    await this.userService.createUser(data);
  }
}