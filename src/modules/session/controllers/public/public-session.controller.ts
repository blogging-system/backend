import { Body, Controller, Post } from '@nestjs/common'
import { RegenerateSessionDto } from '../../dtos'
import { SessionService } from '../../services'
import { Session } from '../../schemas'

@Controller('sessions')
export class PublicSessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('regenerate')
  public regenerateSession(@Body() data: RegenerateSessionDto): Promise<Session> {
    return this.sessionService.regenerateSession(data.refreshToken)
  }
}
