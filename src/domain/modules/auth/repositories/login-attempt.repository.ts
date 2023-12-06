import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { LoginAttempt } from '../schemas'
import { MESSAGES } from '../constants'
import { Model } from 'mongoose'

Injectable()
export class LoginAttemptRepository {
  constructor(@InjectModel(LoginAttempt.name) private LoginAttemptModel: Model<LoginAttempt>) {}

  public async createOne(): Promise<LoginAttempt> {
    const isLoginAttemptCreated = await this.LoginAttemptModel.create({})

    if (!isLoginAttemptCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isLoginAttemptCreated
  }

  public async updateOne(id: string): Promise<LoginAttempt> {
    const isLoginAttemptUpdated = await this.LoginAttemptModel.findByIdAndUpdate(
      id,
      { $inc: { attemptsCount: 1 } },
      { new: true },
    )

    if (!isLoginAttemptUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isLoginAttemptUpdated
  }

  public async findOne(): Promise<LoginAttempt> {
    const allDocs = await this.LoginAttemptModel.find().lean()
    return allDocs[0]
  }
}
