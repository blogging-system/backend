import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { MESSAGES as AUTH_MESSAGES } from '../../auth/constants'
import { InjectModel } from '@nestjs/mongoose'
import { HashUtil } from '@src/shared/utils'
import { MESSAGES } from '../constants'
import { CreateUserDto } from '../dtos'
import { Model, Types } from 'mongoose'
import { User } from '../schemas'

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async createOne(data: CreateUserDto): Promise<User> {
    const isUserCreated = await this.userModel.create({
      ...data,
      password: await HashUtil.generateHash(data.password),
    })

    if (!isUserCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isUserCreated
  }

  public async findOneByEmail(email: string): Promise<User> {
    const isUserFound = await this.userModel.findOne({ email }).lean()

    if (!isUserFound) throw new UnauthorizedException(AUTH_MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    return isUserFound
  }

  public async findOneById(userId: string): Promise<User> {
    const isUserFound = await this.userModel.findOne({ _id: new Types.ObjectId(userId) }).lean()

    if (!isUserFound) throw new NotFoundException(MESSAGES.USER_NOT_FOUND)

    return isUserFound
  }

  public async findOne(query): Promise<User> {
    return await this.userModel.findOne(query).lean()
  }
}
