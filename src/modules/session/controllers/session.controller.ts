import { Controller, Delete, Get, Param, Req, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { CurrentUser } from 'src/modules/user/decorators'
import { User } from 'src/modules/user/schemas'
import { SessionService } from '../services'
import { Session } from '../schemas'
import { CustomRequest } from 'express'

@Controller('/admin/sessions')
@UseInterceptors(ProtectResourceInterceptor)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete('/:sessionId')
  async revokeSession(@Param('sessionId') sessionId: string) {
    return await this.sessionService.revokeSession(sessionId)
  }

  @Delete()
  async revokeAllSession(@Req() req: CustomRequest) {
    return await this.sessionService.revokeAllSessions(req.session.accessToken)
  }

  @Get()
  async getAllSessions(@CurrentUser() user: User): Promise<Session[]> {
    return await this.sessionService.getAllUserSessions(user._id)
  }
}
