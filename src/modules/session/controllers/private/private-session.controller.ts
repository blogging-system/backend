import { Controller, Delete, Get, Param, Req, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { CurrentUser } from 'src/modules/user/decorators'
import { User } from 'src/modules/user/schemas'
import { SessionService } from '../../services'
import { CustomRequest } from 'express'
import { Session } from '../../schemas'

@Controller('/admin/sessions')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateSessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Delete('/:sessionId')
  public revokeSession(@Param('sessionId') sessionId: string) {
    return this.sessionService.revokeSession(sessionId)
  }

  @Delete()
  public revokeAllSession(@Req() req: CustomRequest) {
    return this.sessionService.revokeAllSessions(req.session.accessToken)
  }

  @Get()
  public getAllSessions(@CurrentUser() user: User): Promise<Session[]> {
    return this.sessionService.getAllUserSessions(user._id)
  }
}
