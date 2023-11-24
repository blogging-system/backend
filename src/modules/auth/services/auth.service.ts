import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../../user/services/user.service'
import { TokenHelper } from 'src/shared/helpers/token.helper'
import { LoginDto, LoginResponse } from '../dtos'
import { HashHelper } from 'src/shared/helpers'
import { MESSAGES } from '../constants'
import { SessionService } from '../../session/services'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async login(data: LoginDto): Promise<LoginResponse> {
    const isUserFound = await this.userService.findUserByEmail(data.email)

    if (!isUserFound) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const isPasswordMatch = await HashHelper.verifyHash(data.password, isUserFound.password)

    if (!isPasswordMatch) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const tokenPayload = {
      _id: isUserFound._id,
      role: isUserFound.role,
    }

    const accessToken = await TokenHelper.generateAccessToken(tokenPayload)
    const refreshToken = await TokenHelper.generateRefreshToken(tokenPayload)

    await this.sessionService.createSession({ userId: isUserFound._id, accessToken, refreshToken })

    return {
      accessToken,
      refreshToken,
    }
  }
}
