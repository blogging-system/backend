import { AppService, WelcomeResponse } from './app.service'
import { ResultMessage } from '@src/shared/contracts/types'
import { Controller, Get } from '@nestjs/common'

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
