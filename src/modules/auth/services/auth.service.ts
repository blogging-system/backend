import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginAttemptService } from "./login-attempt.service";
import { ResultMessage } from "@src/shared/contracts/types";
import { UserService } from "@src/modules/user/services";
import { SessionService } from "../../session/services";
import { HashUtil, TokenUtil } from "@src/shared/utils";
import { LoginResponse } from "../types";
import { MESSAGES } from "../constants";
import { LoginDto } from "../dtos";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly loginAttemptService: LoginAttemptService,
  ) {}

  public async login(data: LoginDto, ipAddress: string, device: Record<string, unknown>): Promise<LoginResponse> {
    await this.loginAttemptService.isFailedLoginAttemptsExceeded();

    const user = await this.userService.findUserByEmail(data.email);

    if (!user) {
      await this.loginAttemptService.incrementFailedLoginAttemptsCount();

      throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD);
    }

    const isPasswordMatch = await HashUtil.verifyHash(data.password, user.password);

    if (!isPasswordMatch) {
      await this.loginAttemptService.incrementFailedLoginAttemptsCount();

      throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD);
    }

    const tokenPayload = {
      _id: user._id,
    };

    const accessToken = await TokenUtil.generateAccessToken(tokenPayload);
    const refreshToken = await TokenUtil.generateRefreshToken(tokenPayload);

    await this.sessionService.createSession({ accessToken, refreshToken, ipAddress, device });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async logOut(accessToken: string): Promise<ResultMessage> {
    const { _id } = await this.sessionService.getSession({ accessToken });

    return await this.sessionService.revokeSession(_id);
  }
}
