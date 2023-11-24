import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Session } from '../session.schema'
import { CreateSessionDto } from '../dtos'
import { MESSAGES } from '../constants'

@Injectable()
export class SessionRepository {
  constructor(@InjectModel(Session.name) private sessionModel: Model<Session>) {}

  async createOne(data: CreateSessionDto): Promise<Session> {
    const isSessionCreated = await this.sessionModel.create(data)

    if (!isSessionCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isSessionCreated
  }

  async findOneById(sessionId: string): Promise<Session> {
    const isSessionFound = await this.sessionModel.findOne({ _id: new Types.ObjectId(sessionId) }).lean()

    if (!isSessionFound) throw new NotFoundException(MESSAGES.SESSION_NOT_FOUND)

    return isSessionFound
  }

  async findOneByUserId(userId: string): Promise<Session> {
    const isSessionFound = await this.sessionModel.findOne({ userId: new Types.ObjectId(userId) }).lean()

    if (!isSessionFound) throw new NotFoundException(MESSAGES.SESSION_NOT_FOUND)

    return isSessionFound
  }

  async findOne(query: any): Promise<Session> {
    return await this.sessionModel.findOne(query).lean()
  }
}
