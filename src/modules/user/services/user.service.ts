import { UserRepository } from '../repositories'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dtos'
import { User } from '../schemas'

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async createUser(data: CreateUserDto): Promise<User> {
    return await this.userRepo.createOne(data)
  }

  public async findUserByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneByEmail(email)
  }

  public async findUserById(userId: string): Promise<User> {
    return await this.userRepo.findOneById(userId)
  }

  public async isUserFound(email: string): Promise<boolean> {
    const isUserFound = await this.userRepo.findOne({ email })

    return !!isUserFound
  }
}
