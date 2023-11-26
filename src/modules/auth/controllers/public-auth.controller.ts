import { AuthService } from '../services/auth.service'
import { DeviceInfo, IpAddress, Serialize } from 'src/shared/decorators'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { LoginDto, LoginResponse } from '../dtos'
import { SessionContentDto } from 'src/modules/session/dtos'

@Controller('auth')
export class PublicAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Serialize(SessionContentDto)
  async login(
    @Body() data: LoginDto,
    @IpAddress() ipAddress: string,
    @DeviceInfo() device: any,
  ): Promise<LoginResponse> {
    return await this.authService.login(data, ipAddress, device)
  }
}
