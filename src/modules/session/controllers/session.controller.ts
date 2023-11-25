import { Controller, Get, Param } from '@nestjs/common'
import { SessionService } from '../services'
import { CurrentUser } from 'src/modules/user/decorators'
import { User } from 'src/modules/user/schemas'
import { Serialize } from 'src/shared/decorators'
import { PublicSessionDto } from '../dtos'
import { Session } from '../schemas'

@Controller('sessions')
@Serialize(PublicSessionDto)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('/:sessionId')
  async getSession(@Param('sessionId') sessionId: string, @CurrentUser() user: User): Promise<Session> {
    return await this.sessionService.getSession(sessionId, user._id)
  }

  @Get()
  async getAllUserSessions(@CurrentUser() user: User): Promise<Session[]> {
    return await this.sessionService.getAllUserSessions(user._id)
  }
}
