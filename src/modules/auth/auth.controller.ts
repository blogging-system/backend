import { LoginDto } from './dtos';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from '../user/decorators';
import { User } from '../user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Get('/whoami')
  // @UseGuard(AuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
