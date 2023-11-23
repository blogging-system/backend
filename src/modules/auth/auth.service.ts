import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { LoginDto } from './dtos';
import { MESSAGES } from './constants';
import TokenHelper from 'src/shared/helpers/token.helper';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(data: LoginDto) {
    const isUserFound = await this.userService.findUser(data.email);

    if (!isUserFound)
      throw new BadRequestException(MESSAGES.WRONG_EMAIL_OR_PASSWORD);

    const tokenPayload = {
      userId: isUserFound._id,
      firstName: isUserFound.firstName,
      lastName: isUserFound.lastName,
      isAdmin: isUserFound.isAdmin,
      isRoot: isUserFound.isRoot,
    };

    const accessToken = await TokenHelper.generateAccessToken(tokenPayload);
    const refreshToken = await TokenHelper.generateRefreshToken(tokenPayload);

    return {
      accessToken,
      refreshToken,
    };
  }
}
