import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SessionRepository } from '../repositories'
import { MESSAGES } from '../../auth/constants'
import { CreateSessionDto } from '../dtos'
import { Session } from '../schemas'
import { Types } from 'mongoose'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  async createSession(data: CreateSessionDto): Promise<Session> {
    return await this.sessionRepo.createOne(data)
  }

  async getSession(sessionId: string): Promise<Session> {
    return await this.sessionRepo.findOneById(sessionId)
  }

  async getAllUserSessions(userId: string): Promise<Session[]> {
    return await this.sessionRepo.findMany(userId)
  }

  async isSessionValid(userId: string, accessToken: string): Promise<void> {
    const isSessionFound = await this.sessionRepo.findOne({ userId: new Types.ObjectId(userId), accessToken })

    if (!isSessionFound) throw new UnauthorizedException(MESSAGES.INVOKED_TOKEN)
  }
}
