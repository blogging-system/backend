import { UserRepository } from '../repositories'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dtos'
import { User } from '../schemas'
import { Types } from 'mongoose'
import { HashUtil } from '@src/shared/utils'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepo.createOne({ ...data, password: await HashUtil.generateHash(data.password) })
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOne({ email })
  }

  public async findUserById(userId: Types.ObjectId): Promise<User> {
    return await this.userRepo.findOne({ _id: userId })
  }

  public async findRootUser(): Promise<User> {
    return await this.userRepo.findOne({})
  }

  public async isUserFound(email: string): Promise<boolean> {
    return await this.userRepo.isFound({ email })
  }
}
