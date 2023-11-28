import { Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { UserService } from '../../../user/services/user.service'
import { User } from '../../../user/schemas/user.schema'
import { CurrentUser } from '../../../user/decorators'
import { PublicUserDto } from 'src/modules/user/dtos'
import { Serialize } from 'src/shared/decorators'
import { AuthService } from '../../services'
import { CustomRequest } from 'express'

@Controller('/admin/auth')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/whoami')
  @Serialize(PublicUserDto)
  public async whoAmI(@CurrentUser() user: User): Promise<User> {
    return await this.userService.findUserById(user._id)
  }

  @Post('/logout')
  public async logOut(@Req() req: CustomRequest) {
    return await this.authService.logOut(req.session.accessToken)
  }
}
