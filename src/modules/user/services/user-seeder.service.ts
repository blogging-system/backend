import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from '../dtos'

@Injectable()
export class UserSeederService {
  constructor(private readonly userService: UserService) {}

  public async seedRootUser(data: CreateUserDto): Promise<void> {
    const isUserFound = await this.userService.isUserFound(data.email)

    if (isUserFound) return

    await this.userService.createUser(data)
  }
}
