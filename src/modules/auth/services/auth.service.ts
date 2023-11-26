import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../../user/services/user.service'
import { TokenHelper } from 'src/shared/helpers/token.helper'
import { SessionService } from '../../session/services'
import { ResultMessage } from 'src/shared/types'
import { LoginDto, LoginResponse } from '../dtos'
import { HashHelper } from 'src/shared/helpers'
import { MESSAGES } from '../constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async login(data: LoginDto, ipAddress: string, device: Record<string, unknown>): Promise<LoginResponse> {
    const isUserFound = await this.userService.findUserByEmail(data.email)

    if (!isUserFound) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const isPasswordMatch = await HashHelper.verifyHash(data.password, isUserFound.password)

    if (!isPasswordMatch) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const tokenPayload = {
      _id: isUserFound._id,
    }

    const accessToken = await TokenHelper.generateAccessToken(tokenPayload)
    const refreshToken = await TokenHelper.generateRefreshToken(tokenPayload)

    await this.sessionService.createSession({ userId: isUserFound._id, accessToken, refreshToken, ipAddress, device })

    return {
      accessToken,
      refreshToken,
    }
  }

  async logOut(currentAccessToken: string): Promise<ResultMessage> {
    const foundSession = await this.sessionService.getSession(currentAccessToken)

    return await this.sessionService.revokeSession(foundSession._id, true)
  }
}
