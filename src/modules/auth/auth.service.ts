import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/services/user.service'
import TokenHelper from 'src/shared/helpers/token.helper'
import { LoginDto, LoginResponse } from './dtos'
import { HashHelper } from 'src/shared/helpers'
import { MESSAGES } from './constants'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(data: LoginDto): Promise<LoginResponse> {
    const isUserFound = await this.userService.findUserByEmail(data.email)

    if (!isUserFound) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const isPasswordMatch = await HashHelper.verifyHash(data.password, isUserFound.password)

    if (!isPasswordMatch) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const tokenPayload = {
      _id: isUserFound._id,
      role: isUserFound.role,
    }

    return {
      accessToken: await TokenHelper.generateAccessToken(tokenPayload),
      refreshToken: await TokenHelper.generateRefreshToken(tokenPayload),
    }
  }
}
