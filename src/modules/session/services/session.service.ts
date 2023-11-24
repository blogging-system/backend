import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SessionRepository } from '../repositories'
import { MESSAGES } from '../../auth/constants'
import { CreateSessionDto } from '../dtos'
import { Session } from '../schemas'

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
