import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { MESSAGES as AUTH_MESSAGES } from '../../auth/constants'
import { SessionRepository } from '../repositories'
import { MESSAGES } from './../../../shared/constants'
import { CreateSessionDto } from '../dtos'
import { Session } from '../schemas'
import { Types } from 'mongoose'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  async createSession(data: CreateSessionDto): Promise<Session> {
    return await this.sessionRepo.createOne(data)
  }

  async getSession(sessionId: string, userId: string): Promise<Session> {
    const isSessionFound = await this.sessionRepo.findOne({
      _id: new Types.ObjectId(sessionId),
      userId: new Types.ObjectId(userId),
    })
    console.log({ sessionId, userId, isSessionFound })

    if (!isSessionFound) throw new ForbiddenException(MESSAGES.NOT_ALLOWED)

    return isSessionFound
  }

  async getAllUserSessions(userId: string): Promise<Session[]> {
    return await this.sessionRepo.findMany(userId)
  }

  async isSessionValid(userId: string, accessToken: string): Promise<void> {
    const isSessionFound = await this.sessionRepo.findOne({ userId: new Types.ObjectId(userId), accessToken })

    if (!isSessionFound) throw new UnauthorizedException(AUTH_MESSAGES.INVOKED_TOKEN)
  }
}
