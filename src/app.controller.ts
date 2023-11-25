import { AppService, WelcomeResponse } from './app.service'
import { Controller, Get } from '@nestjs/common'
import { ResultMessage } from './shared/types'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  ping(): ResultMessage {
    return this.appService.ping()
  }

  @Get()
  getHello(): WelcomeResponse {
    return this.appService.getHello()
  }
}
