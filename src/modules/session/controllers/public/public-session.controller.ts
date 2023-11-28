import { Body, Controller, Post } from '@nestjs/common'
import { RegenerateSessionDto } from '../../dtos'
import { SessionService } from '../../services'

@Controller('sessions')
export class PublicSessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('regenerate')
  public regenerateSession(@Body() data: RegenerateSessionDto) {
    return this.sessionService.regenerateSession(data.refreshToken)
  }
}
