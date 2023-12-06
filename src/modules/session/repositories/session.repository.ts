import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DocumentIdType, ResultMessage } from '@src/shared/contracts/types'
import { InjectModel } from '@nestjs/mongoose'
import { CreateSessionDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Model, Types } from 'mongoose'
import { Session } from '../schemas'
import { BaseRepository } from '@src/shared/repository'

@Injectable()
export class SessionRepository extends BaseRepository<Session> {
  constructor(@InjectModel(Session.name) sessionModel: Model<Session>) {
    super(sessionModel)
  }

  // public async createOne(data: CreateSessionDto): Promise<Session> {
  //   const isSessionCreated = await this.sessionModel.create(data)

  //   if (!isSessionCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

  //   return isSessionCreated
  // }

  // public async deleteOne(sessionId: DocumentIdType): Promise<{ deletedCount: number }> {
  //   return await this.sessionModel.deleteOne({ _id: new Types.ObjectId(sessionId) })
  // }

  // public async deleteMany(excludedAccessToken: string): Promise<ResultMessage> {
  //   const areSessionsRevoked = await this.sessionModel.deleteMany({ accessToken: { $ne: excludedAccessToken } })

  //   if (!areSessionsRevoked) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

  //   return { message: MESSAGES.ALL_DELETED_SUCCESSFULLY }
  // }

  // public async findOne(query: any): Promise<Session> {
  //   return await this.sessionModel.findOne(query).lean()
  // }

  // public async findMany(): Promise<Session[]> {
  //   const areSessionsFound = await this.sessionModel.find().lean()

  //   if (areSessionsFound.length === 0) throw new NotFoundException(MESSAGES.SESSIONS_NOT_FOUND)

  //   return areSessionsFound
  // }
}
