import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateSessionDto } from './dtos'
import { Session } from './session.schema'
import { SessionRepository } from './repositories'
import { MESSAGES } from '../auth/constants'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  async createSession(data: CreateSessionDto): Promise<Session> {
    return await this.sessionRepo.createOne(data)
  }

  async getSession(sessionId: string): Promise<Session> {
    return await this.sessionRepo.findOneById(sessionId)
  }

  async isSessionValid(sessionId: string): Promise<void> {
    const isSessionFound = await this.sessionRepo.findOne({ _id: sessionId })

    if (!isSessionFound) throw new UnauthorizedException(MESSAGES.INVOKED_TOKEN)
  }
}
