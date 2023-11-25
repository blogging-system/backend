import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { MESSAGES as AUTH_MESSAGES } from '../../auth/constants'
import { MESSAGES } from './../../../shared/constants'
import { SessionRepository } from '../repositories'
import { CreateSessionDto } from '../dtos'
import { Session } from '../schemas'
import { Types } from 'mongoose'
import { ResultMessage } from 'src/shared/types'

@Injectable()
export class SessionService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  async createSession(data: CreateSessionDto): Promise<Session> {
    return await this.sessionRepo.createOne(data)
  }

  async deleteSession(sessionId: string): Promise<ResultMessage> {
    await this.isSessionValid(sessionId)

    return await this.sessionRepo.deleteOne(sessionId)
  }

  async getSession(sessionId: string): Promise<Session> {
    const isSessionFound = await this.sessionRepo.findOne({
      _id: new Types.ObjectId(sessionId),
    })

    // TODO:// here!
    // if (!isSessionFound) throw new ForbiddenException(MESSAGES.)

    return isSessionFound
  }

  async getAllUserSessions(userId: string): Promise<Session[]> {
    return await this.sessionRepo.findMany(userId)
  }

  async isSessionValid(accessToken: string): Promise<Session> {
    const isSessionFound = await this.sessionRepo.findOne({
      accessToken,
    })

    if (!isSessionFound) throw new UnauthorizedException(AUTH_MESSAGES.INVOKED_TOKEN)

    return isSessionFound
  }
}
