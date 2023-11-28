import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { MESSAGES as AUTH_MESSAGES } from '../../auth/constants'
import { CreateSessionDto, IsSessionValidDto } from '../dtos'
import { SessionRepository } from '../repositories'
import { TokenUtil } from 'src/shared/utils'
import { ResultMessage } from 'src/shared/types'
import { MESSAGES } from '../constants'
import { Session } from '../schemas'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  public async createSession(data: CreateSessionDto): Promise<Session> {
    return await this.sessionRepo.createOne(data)
  }

  public async regenerateSession(refreshToken: string): Promise<Session> {
    const validSession = await this.isSessionValid({ refreshToken })

    await this.revokeSession(validSession._id)

    const payload = {
      userId: validSession._id,
      device: validSession.device,
      ipAddress: validSession.ipAddress,
      accessToken: await TokenUtil.generateAccessToken({ _id: validSession._id }),
      refreshToken: await TokenUtil.generateRefreshToken({ _id: validSession._id }),
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

  public async getSession(accessToken: string): Promise<Session> {
    const isSessionFound = await this.sessionRepo.findOne({ accessToken })

    if (!isSessionFound) throw new BadRequestException(MESSAGES.SESSION_NOT_FOUND)

    return isSessionFound
  }

  public async getAllUserSessions(userId: string): Promise<Session[]> {
    return await this.sessionRepo.findMany(userId)
  }

  public async isSessionValid({ accessToken, refreshToken, sessionId }: IsSessionValidDto): Promise<Session> {
    const query: IsSessionValidDto = {}

    if (accessToken) query.accessToken = accessToken
    if (refreshToken) query.refreshToken = refreshToken
    if (sessionId) query.sessionId = sessionId

    const isSessionFound = await this.sessionRepo.findOne(query)

    if (!isSessionFound) throw new UnauthorizedException(AUTH_MESSAGES.INVOKED_TOKEN)

    return isSessionFound
  }
}
