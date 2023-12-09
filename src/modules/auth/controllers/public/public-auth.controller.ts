import { DeviceInfo, IpAddress, Serialize } from "@src/shared/decorators";
import { PublicSessionDto } from "@src/modules/session/dtos";
import { AuthService } from "../../services/auth.service";
import { Body, Controller, Post } from "@nestjs/common";
import { LoginResponse } from "../../types";
import { LoginDto } from "../../dtos";
import { CreateUserDto } from "@src/modules/user/dtos";
import { ResultMessage } from "@src/shared/contracts/types";

@Controller("auth")
export class PublicAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  public singUp(@Body() data: CreateUserDto): Promise<ResultMessage> {
    return this.authService.signUp(data);
  }

  @Post("/login")
  @Serialize(PublicSessionDto)
  public login(
    @Body() data: LoginDto,
    @IpAddress() ipAddress: string,
    @DeviceInfo() device: any,
  ): Promise<LoginResponse> {
    return this.authService.login(data, ipAddress, device);
  }
}
