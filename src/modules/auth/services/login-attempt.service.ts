import { TooManyRequestsException } from "@src/shared/exceptions";
import { LoginAttemptRepository } from "../repositories";
import { Injectable } from "@nestjs/common";
import { LoginAttempt } from "../schemas";
import { DocumentIdType } from "@src/shared/contracts/types";

@Injectable()
export class LoginAttemptService {
  constructor(private readonly loginAttemptRepo: LoginAttemptRepository) {}

  public async incrementFailedLoginAttemptsCount(userId: DocumentIdType): Promise<LoginAttempt> {
    const isLoginAttemptFound = await this.loginAttemptRepo.findOne({ userId });

    if (!isLoginAttemptFound) {
      return await this.createLoginAttempt(userId);
    }

    if (isLoginAttemptFound && isLoginAttemptFound.attemptsCount >= 5) throw new TooManyRequestsException();

    return await this.loginAttemptRepo.updateOne({ userId }, { $inc: { attemptsCount: 1 } });
  }

  private async createLoginAttempt(userId: DocumentIdType): Promise<LoginAttempt> {
    return await this.loginAttemptRepo.createOne({ userId });
  }
}
