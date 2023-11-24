import { Controller, Get, Param, Req } from '@nestjs/common'
import { SessionService } from '../services'
import { CurrentUser } from 'src/modules/user/decorators'
import { User } from 'src/modules/user/schemas'
import { Serialize } from 'src/shared/decorators'
import { PublicSessionDto } from '../dtos'

@Serialize(PublicSessionDto)
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get(':sessionId')
  async getSession(@Param('sessionId') sessionId: string, @CurrentUser() user: User) {
    return await this.sessionService.getSession(sessionId, user._id)
  }

  @Get()
  async getAllUserSessions(@CurrentUser() user: User) {
    return await this.sessionService.getAllUserSessions(user._id)
  }
}
