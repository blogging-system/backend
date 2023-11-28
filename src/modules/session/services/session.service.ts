import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { MESSAGES as AUTH_MESSAGES } from '../../auth/constants'
import { CreateSessionDto, IsSessionValidDto } from '../dtos'
import { SessionRepository } from '../repositories'
import { ResultMessage } from 'src/shared/types'
import { TokenUtil } from 'src/shared/utils'
import { MESSAGES } from '../constants'
import { Session } from '../schemas'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  public async createSession(data: CreateSessionDto): Promise<Session> {
    return await this.sessionRepo.createOne(data)
  }

  public async regenerateSession(refreshToken: string): Promise<Session> {
    const { _id: userId, device, ipAddress } = await this.getSession({ refreshToken })

    await this.revokeSession(userId)

    const payload = {
      userId,
      device,
      ipAddress,
      accessToken: await TokenUtil.generateAccessToken({ _id: userId }),
      refreshToken: await TokenUtil.generateRefreshToken({ _id: userId }),
    }

    return await this.sessionRepo.createOne(payload)
  }

  public async revokeSession(sessionId: string): Promise<ResultMessage> {
    const isSessionRevoked = await this.sessionRepo.deleteOne(sessionId)

    if (isSessionRevoked.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async deleteSession(sessionId: string): Promise<ResultMessage> {
    const isSessionDeleted = await this.sessionRepo.deleteOne(sessionId)

    if (isSessionDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: AUTH_MESSAGES.LOGGED_OUT_SUCCESSFULLY }
  }

  public async revokeAllSessions(currentAccessToken: string): Promise<ResultMessage> {
    return await this.sessionRepo.deleteMany(currentAccessToken)
  }

  public async getSession({ accessToken, refreshToken, sessionId }: IsSessionValidDto): Promise<Session> {
    const query: IsSessionValidDto = {}

    if (accessToken) query.accessToken = accessToken
    if (refreshToken) query.refreshToken = refreshToken
    if (sessionId) query.sessionId = sessionId

    const isSessionFound = await this.sessionRepo.findOne(query)

    if (!isSessionFound) throw new UnauthorizedException(AUTH_MESSAGES.INVOKED_TOKEN)

    return isSessionFound
  }

  public async getAllUserSessions(userId: string): Promise<Session[]> {
    return await this.sessionRepo.findMany(userId)
  }
}
