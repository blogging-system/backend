import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginAttemptRepository } from "../repositories";
import { LoginAttempt } from "../schemas";
import { MESSAGES } from "../constants";

@Injectable()
export class LoginAttemptService {
  constructor(private readonly loginAttemptRepo: LoginAttemptRepository) {}

  public async createLoginAttempt(): Promise<LoginAttempt> {
    return await this.loginAttemptRepo.createOne({});
  }

  public async incrementFailedLoginAttemptsCount(): Promise<LoginAttempt> {
    const isLoginAttemptFound = await this.loginAttemptRepo.isFound({});

    if (!isLoginAttemptFound) {
      return await this.createLoginAttempt();
    }

    return await this.loginAttemptRepo.updateOne({}, { $inc: { attemptsCount: 1 } });
  }

  public async isFailedLoginAttemptsExceeded(): Promise<boolean> {
    const isLoginAttemptFound = await this.loginAttemptRepo.isFound({});

    if (!isLoginAttemptFound) return false;

    const loginAttempt = await this.loginAttemptRepo.findOne({});

    if (loginAttempt && loginAttempt.attemptsCount >= 5)
      throw new HttpException(MESSAGES.TOO_MANY_REQUESTS, HttpStatus.TOO_MANY_REQUESTS);

    return false;
  }
}
