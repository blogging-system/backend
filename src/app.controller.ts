import { AppService, WelcomeResponse } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): WelcomeResponse {
    return this.appService.getHello();
  }
}
