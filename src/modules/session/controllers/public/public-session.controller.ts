import { Body, Controller, Post } from '@nestjs/common'
import { RegenerateSessionDto } from '../../dtos'
import { SessionService } from '../../services'

@Controller('sessions')
export class PublicSessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('regenerate')
  async regenerateSession(@Body() data: RegenerateSessionDto) {
    return await this.sessionService.regenerateSession(data.refreshToken)
  }
}
