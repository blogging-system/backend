import { User } from '../../user/schemas/user.schema'
import { AuthService } from '../services/auth.service'
import { CurrentUser } from '../../user/decorators'
import { DeviceInfo, IpAddress, Serialize } from 'src/shared/decorators'
import { UserService } from '../../user/services/user.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { LoginDto, LoginResponse } from '../dtos'
import { PublicUserDto } from 'src/modules/user/dtos'
import { SessionContentDto } from 'src/modules/session/dtos'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @Serialize(SessionContentDto)
  async login(
    @Body() data: LoginDto,
    @IpAddress() ipAddress: string,
    @DeviceInfo() device: any,
  ): Promise<LoginResponse> {
    return await this.authService.login(data, ipAddress, device)
  }

  @Get('/whoami')
  @Serialize(PublicUserDto)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findUserById(user._id)
  }
}
