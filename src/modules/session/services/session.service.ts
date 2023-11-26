import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { MESSAGES as AUTH_MESSAGES } from '../../auth/constants'
import { MESSAGES } from './../../../shared/constants'
import { SessionRepository } from '../repositories'
import { CreateSessionDto, IsSessionValidDto } from '../dtos'
import { Session } from '../schemas'
import { Types } from 'mongoose'
import { ResultMessage } from 'src/shared/types'
import { setMaxIdleHTTPParsers } from 'http'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  async createSession(data: CreateSessionDto): Promise<Session> {
    return await this.sessionRepo.createOne(data)
  }

  async revokeSession(sessionId: string): Promise<ResultMessage> {
    return await this.sessionRepo.deleteOne(sessionId)
  }

  async revokeAllSessions(currentAccessToken: string): Promise<ResultMessage> {
    return await this.sessionRepo.deleteMany(currentAccessToken)
  }

  async getAllUserSessions(userId: string): Promise<Session[]> {
    return await this.sessionRepo.findMany(userId)
  }

  async isSessionValid({ accessToken, sessionId }: IsSessionValidDto): Promise<Session> {
    const query: IsSessionValidDto = {}

    if (accessToken) query.accessToken = accessToken
    if (sessionId) query.sessionId = sessionId

    const isSessionFound = await this.sessionRepo.findOne(query)

    if (!isSessionFound) throw new UnauthorizedException(AUTH_MESSAGES.INVOKED_TOKEN)

    return isSessionFound
  }
}
