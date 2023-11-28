import { DeviceInfo, IpAddress, Serialize } from 'src/shared/decorators'
import { SessionContentDto } from 'src/modules/session/dtos'
import { AuthService } from '../../services/auth.service'
import { Body, Controller, Post } from '@nestjs/common'
import { LoginResponse } from '../../types'
import { LoginDto } from '../../dtos'

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
