import {
  InvalidTokenException,
  EmailAlreadyTakenException,
  UserNameAlreadyTakenException,
} from "@src/shared/exceptions";
import { MESSAGES } from "../constants";
import { appConfig } from "@src/shared/config";
import { LoginDto, VerifyEmailDto } from "../dtos";
import { CreateUserDto } from "@src/modules/user/dtos";
import { HashUtil, TokenUtil } from "@src/shared/utils";
import { SessionService } from "../../session/services";
import { UserService } from "@src/modules/user/services";
import { LoginAttemptService } from "./login-attempt.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { Session } from "@src/modules/session/schemas";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly loginAttemptService: LoginAttemptService,
  ) {}

  public async signUp(data: CreateUserDto): Promise<ResultMessage> {
    await this.areEmailAndUserNameAvailable(data);

    const createdUser = await this.userService.createUser({
      ...data,
    });

    const verificationToken = await TokenUtil.generateVerificationToken({ userId: createdUser._id });

    await this.userService.updateUser({ _id: createdUser._id }, { verificationToken });

    const verificationLink = `${appConfig.client.baseUrl}:${appConfig.client.port}/auth/verify-email/${verificationToken}`;

    // TODO: Should Send verification Email to user mailbox!
    console.log({ verificationLink });

    return { message: MESSAGES.SIGNED_UP_SUCCESSFULLY };
  }

  public async verifyEmail(data: VerifyEmailDto): Promise<ResultMessage> {
    const { userId } = await this.verifyVerificationToken(data.verificationToken);

    await this.userService.updateUser(
      { _id: userId, isVerified: false },
      {
        $set: { isVerified: true, verifiedAt: new Date() },
        $unset: {
          verificationToken: 1,
        },
      },
    );

    return { message: MESSAGES.EMAIL_VERIFIED_SUCCESSFULLY };
  }

  public async login(data: LoginDto, ipAddress: string, device: Record<string, unknown>): Promise<Session> {
    const user = await this.userService.findUserByEmail(data.email);

    if (!user) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD);

    const isPasswordMatch = await HashUtil.verifyHash(data.password, user.password);

    if (!isPasswordMatch) {
      await this.loginAttemptService.incrementFailedLoginAttemptsCount(user._id);

      throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD);
    }

    return await this.sessionService.createSession({ _id: user._id, type: user.type, device, ipAddress });
  }

  public async logOut(accessToken: string): Promise<ResultMessage> {
    const { _id } = await this.sessionService.getSession({ accessToken });

    return await this.sessionService.revokeSession(_id);
  }

  private async isEmailAvailable(email: string): Promise<void> {
    const isEmailAlreadyTaken = await this.userService.isUserFound({ email });

    if (isEmailAlreadyTaken) throw new EmailAlreadyTakenException();
  }

  private async isUserNameAvailable(userName: string): Promise<void> {
    const isUserNameAlreadyTaken = await this.userService.isUserFound({ userName });

    if (isUserNameAlreadyTaken) throw new UserNameAlreadyTakenException();
  }

  private async areEmailAndUserNameAvailable(data: CreateUserDto): Promise<void> {
    await this.isEmailAvailable(data.email);
    await this.isUserNameAvailable(data.userName);
  }

  private async verifyVerificationToken(verificationToken: string): Promise<{ userId: DocumentIdType }> {
    try {
      return await TokenUtil.verifyVerificationToken(verificationToken);
    } catch (error) {
      throw new InvalidTokenException(MESSAGES.INVALID_VERIFICATION_TOKEN);
    }
  }
}
