import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { HashUtil } from 'src/shared/utils'
import { InjectModel } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { CreateUserDto } from '../dtos'
import { Model, Types } from 'mongoose'
import { User } from '../schemas'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createOne(data: CreateUserDto): Promise<User> {
    const isUserCreated = await this.userModel.create({
      ...data,
      password: await HashUtil.generateHash(data.password),
    })

    if (!isUserCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isUserCreated
  }

  async findOneByEmail(email: string): Promise<User> {
    const isUserFound = await this.userModel.findOne({ email }).lean()

    if (!isUserFound) throw new NotFoundException(MESSAGES.USER_NOT_FOUND)

    return isUserFound
  }

  async findOneById(userId: string): Promise<User> {
    const isUserFound = await this.userModel.findOne({ _id: new Types.ObjectId(userId) }).lean()

    if (!isUserFound) throw new NotFoundException(MESSAGES.USER_NOT_FOUND)

    return isUserFound
  }

  async findOne(query): Promise<User> {
    return await this.userModel.findOne(query).lean()
  }
}
