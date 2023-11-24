import { UserRepository } from '../repositories'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dtos'
import { User } from '../schemas'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepo.createOne(data)
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneByEmail(email)
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userRepo.findOneById(userId)
  }

  async isUserFound(email: string): Promise<boolean> {
    const isUserFound = await this.userRepo.findOne({ email })

    return !!isUserFound
  }
}
