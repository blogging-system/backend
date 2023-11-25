import { UserService } from '../services/user.service'
import { Serialize } from 'src/shared/decorators'
import { Controller } from '@nestjs/common'
import { PublicUserDto } from '../dtos'

@Controller('users')
@Serialize(PublicUserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}
}
