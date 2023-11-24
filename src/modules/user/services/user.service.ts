import { User } from '../schemas/user.schema'
import { CreateUserDto } from '../dtos'
import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories/user.repository'

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
