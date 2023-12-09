import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginAttemptRepository } from "../repositories";
import { LoginAttempt } from "../schemas";
import { MESSAGES } from "../constants";

@Injectable()
export class LoginAttemptService {
  constructor(private readonly loginAttemptRepo: LoginAttemptRepository) {}

  public async createLoginAttempt(email: string): Promise<LoginAttempt> {
    return await this.loginAttemptRepo.createOne({ email });
  }

  public async incrementFailedLoginAttemptsCount(email: string): Promise<LoginAttempt> {
    const isLoginAttemptFound = await this.loginAttemptRepo.isFound({ email });

    if (!isLoginAttemptFound) {
      return await this.createLoginAttempt(email);
    }

    return await this.loginAttemptRepo.updateOne({ email }, { $inc: { attemptsCount: 1 } });
  }

  public async isFailedLoginAttemptsExceeded(email): Promise<boolean> {
    const isLoginAttemptFound = await this.loginAttemptRepo.isFound({ email });

    if (!isLoginAttemptFound) return false;

    const loginAttempt = await this.loginAttemptRepo.findOne({ email });

    if (loginAttempt && loginAttempt.attemptsCount >= 5)
      throw new HttpException(MESSAGES.TOO_MANY_REQUESTS, HttpStatus.TOO_MANY_REQUESTS);

    return false;
  }
}
