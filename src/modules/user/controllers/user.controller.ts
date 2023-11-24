import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from '../services/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
