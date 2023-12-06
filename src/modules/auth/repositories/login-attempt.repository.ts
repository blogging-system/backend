import { BaseRepository } from '@src/shared/repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { LoginAttempt } from '../schemas'
import { Model } from 'mongoose'

Injectable()
export class LoginAttemptRepository extends BaseRepository<LoginAttempt> {
  constructor(@InjectModel(LoginAttempt.name) loginAttemptModel: Model<LoginAttempt>) {
    super(loginAttemptModel)
  }
}
