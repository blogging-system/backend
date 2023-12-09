import {
  EmailAlreadyTakenException,
  InvalidTokenException,
  UserNameAlreadyTakenException,
} from "@src/shared/exceptions";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginAttemptService } from "./login-attempt.service";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { UserService } from "@src/modules/user/services";
import { SessionService } from "../../session/services";
import { HashUtil, TokenUtil } from "@src/shared/utils";
import { CreateUserDto } from "@src/modules/user/dtos";
import { LoginResponse } from "../types";
import { MESSAGES } from "../constants";
import { LoginDto, VerifyEmailDto } from "../dtos";
import { appConfig } from "@src/shared/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly loginAttemptService: LoginAttemptService,
  ) {}

  public async signUp(data: CreateUserDto): Promise<ResultMessage> {
    const isEmailAlreadyTaken = await this.userService.isUserFound({ email: data.email });

    if (isEmailAlreadyTaken) throw new EmailAlreadyTakenException();

    const isUserNameAlreadyTaken = await this.userService.isUserFound({ email: data.email });

    if (isUserNameAlreadyTaken) throw new UserNameAlreadyTakenException();

    const createdUser = await this.userService.createUser({
      ...data,
    });

    const verificationToken = await TokenUtil.generateVerificationToken({ userId: createdUser._id });

    await this.userService.updateUser(createdUser._id, { verificationToken });

    const verificationLink = `${appConfig.client.baseUrl}:${appConfig.client.port}/auth/verify-email/${verificationToken}`;

    // TODO: Should Send verification Email to user mailbox!
    console.log({ verificationLink });

    return { message: MESSAGES.SIGNED_UP_SUCCESSFULLY };
  }

  public async verifyEmail(data: VerifyEmailDto): Promise<ResultMessage> {
    const { userId } = await this.verifyVerificationToken(data.verificationToken);

    await this.userService.updateUser(userId, {
      $set: { isVerified: true, verifiedAt: new Date() },
      $unset: {
        verificationToken: 1,
      },
    });

    return { message: MESSAGES.EMAIL_VERIFIED_SUCCESSFULLY };
  }

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

  private async verifyVerificationToken(verificationToken: string): Promise<{ userId: DocumentIdType }> {
    try {
      return await TokenUtil.verifyVerificationToken(verificationToken);
    } catch (error) {
      throw new InvalidTokenException(MESSAGES.INVALID_VERIFICATION_TOKEN);
    }
  }
}
