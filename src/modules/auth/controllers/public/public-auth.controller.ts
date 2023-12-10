import { DeviceInfo, IpAddress, Serialize } from "@src/shared/decorators";
import { PublicSessionDto } from "@src/modules/session/dtos";
import { ResultMessage } from "@src/shared/contracts/types";
import { AuthService } from "../../services/auth.service";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "@src/modules/user/dtos";
import { Session } from "@src/modules/session/schemas";
import { LoginDto, VerifyEmailDto } from "../../dtos";

@Controller("auth")
export class PublicAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  public singUp(@Body() data: CreateUserDto): Promise<ResultMessage> {
    return this.authService.signUp(data);
  }

  @Post("/verify-email")
  public verifyEmail(@Body() data: VerifyEmailDto): Promise<ResultMessage> {
    return this.authService.verifyEmail(data);
  }

  @Post("/login")
  @Serialize(PublicSessionDto)
  public login(@Body() data: LoginDto, @IpAddress() ipAddress: string, @DeviceInfo() device: any): Promise<Session> {
    return this.authService.login(data, ipAddress, device);
  }
}
