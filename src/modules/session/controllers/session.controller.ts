import { Controller, Delete, Get, Param, Req } from '@nestjs/common'
import { CurrentUser } from 'src/modules/user/decorators'
import { Serialize } from 'src/shared/decorators'
import { User } from 'src/modules/user/schemas'
import { SessionService } from '../services'
import { PublicSessionDto } from '../dtos'
import { Session } from '../schemas'
import { CustomRequest } from 'express'

@Controller('sessions')
@Serialize(PublicSessionDto)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete('/:sessionId')
  async deleteSession(@Param('sessionId') sessionId: string) {
    return await this.sessionService.deleteSession(sessionId)
  }

  @Get('/:sessionId')
  async getSession(@Param('sessionId') sessionId: string): Promise<Session> {
    return await this.sessionService.getSession(sessionId)
  }

  @Get()
  async getAllUserSessions(@CurrentUser() user: User): Promise<Session[]> {
    return await this.sessionService.getAllUserSessions(user._id)
  }
}
