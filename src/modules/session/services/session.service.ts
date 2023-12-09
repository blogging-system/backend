import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { MESSAGES as AUTH_MESSAGES } from "../../auth/constants";
import { GetSessionDto, GetSessionQuery } from "../dtos";
import { SessionRepository } from "../repositories";
import { UserService } from "../../user/services";
import { TokenUtil } from "@src/shared/utils";
import { CreateSession } from "../interfaces";
import { AuthTokens } from "../types";
import { Session } from "../schemas";

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepo: SessionRepository,
    private readonly userService: UserService,
  ) {}

  public async createSession({ _id, roles, device, ipAddress }: CreateSession): Promise<AuthTokens> {
    const accessToken = await TokenUtil.generateAccessToken({ _id, roles });
    const refreshToken = await TokenUtil.generateRefreshToken({ _id, roles });

    await this.sessionRepo.createOne({ accessToken, refreshToken, ipAddress, device });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async regenerateSession(refreshToken: string): Promise<Session> {
    const { _id: sessionId, device, ipAddress } = await this.getSession({ refreshToken });

    await this.revokeSession(sessionId);

    const { _id } = await this.userService.findRootUser();

    const payload = {
      device,
      ipAddress,
      accessToken: await TokenUtil.generateAccessToken({ _id }),
      refreshToken: await TokenUtil.generateRefreshToken({ _id }),
    };

    return await this.sessionRepo.createOne(payload);
  }

  public async revokeSession(sessionId: DocumentIdType): Promise<ResultMessage> {
    await this.sessionRepo.deleteOne({ _id: sessionId });

    return { message: AUTH_MESSAGES.LOGGED_OUT_SUCCESSFULLY };
  }

  public async revokeAllSessions(excludedAccessToken: string): Promise<ResultMessage> {
    return await this.sessionRepo.delete({ accessToken: { $ne: excludedAccessToken } });
  }

  public async getSession({ sessionId, accessToken, refreshToken }: GetSessionDto): Promise<Session> {
    const query: GetSessionQuery = {};

    if (sessionId) query.sessionId = sessionId;
    if (accessToken) query.accessToken = accessToken;
    if (refreshToken) query.refreshToken = refreshToken;

    const isSessionFound = await this.sessionRepo.isFound(query);

    if (!isSessionFound) throw new UnauthorizedException(AUTH_MESSAGES.INVOKED_TOKEN);

    return await this.sessionRepo.findOne(query);
  }

  public async getAllSessions(): Promise<Session[]> {
    return await this.sessionRepo.find({});
  }
}
