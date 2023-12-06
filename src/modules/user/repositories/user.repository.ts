import { BaseRepository } from '@src/shared/repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { User } from '../schemas'
import { Model } from 'mongoose'

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel)
  }
}
