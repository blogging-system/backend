import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() { firstName, lastName }: any) {
    return await this.userService.createUser(firstName, lastName);
  }
}
