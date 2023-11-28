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
  public async revokeSession(@Param('sessionId') sessionId: string) {
    return await this.sessionService.revokeSession(sessionId)
  }

  @Delete()
  public async revokeAllSession(@Req() req: CustomRequest) {
    return await this.sessionService.revokeAllSessions(req.session.accessToken)
  }

  @Get()
  public async getAllSessions(@CurrentUser() user: User): Promise<Session[]> {
    return await this.sessionService.getAllUserSessions(user._id)
  }
}
