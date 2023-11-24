import { User } from '../../user/schemas/user.schema'
import { AuthService } from '../services/auth.service'
import { CurrentUser } from '../../user/decorators'
import { Serialize } from 'src/shared/decorators'
import { UserService } from '../../user/services/user.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { LoginDto, LoginResponse, PublicUserDto } from '../dtos'

@Serialize(PublicUserDto)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  async login(@Body() data: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(data)
  }

  @Get('/whoami')
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findUserById(user._id)
  }
}
