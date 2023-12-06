import { Controller, Get, HttpCode, HttpStatus, Post, Req, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { UserService } from '../../../user/services/user.service'
import { User } from '../../../user/schemas/user.schema'
import { CurrentUser } from '../../../user/decorators'
import { PublicUserDto } from '@src/modules/user/dtos'
import { Serialize } from '@src/shared/decorators'
import { ResultMessage } from '@src/shared/contracts/types'
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
  public whoAmI(@CurrentUser() user: Partial<User>): Promise<User> {
    return this.userService.findUserById(user._id)
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  public logOut(@Req() req: CustomRequest): Promise<ResultMessage> {
    return this.authService.logOut(req.session.accessToken)
  }
}
