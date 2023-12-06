import { LoginAttemptRepository } from '../repositories/login-attempt.repository'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { LoginAttempt } from '../schemas'
import { MESSAGES } from '../constants'

@Injectable()
export class LoginAttemptService {
  constructor(private readonly loginAttemptRepo: LoginAttemptRepository) {}

  public async createLoginAttempt(): Promise<LoginAttempt> {
    return await this.loginAttemptRepo.createOne()
  }

  public async incrementFailedLoginAttemptsCount(): Promise<LoginAttempt> {
    const isLoginAttemptFound = await this.loginAttemptRepo.findOne()

    if (!isLoginAttemptFound) {
      return await this.createLoginAttempt()
    }

    return await this.loginAttemptRepo.updateOne(isLoginAttemptFound._id)
  }

  public async isFailedLoginAttemptsExceeded(): Promise<boolean> {
    const isLoginAttemptFound = await this.loginAttemptRepo.findOne()

    if (isLoginAttemptFound && isLoginAttemptFound.attemptsCount >= 5)
      throw new HttpException(MESSAGES.TOO_MANY_REQUESTS, HttpStatus.TOO_MANY_REQUESTS)

    return false
  }
}
