import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../../user/services/user.service'
import { SessionService } from '../../session/services'
import { HashUtil, TokenUtil } from 'src/shared/utils'
import { ResultMessage } from 'src/shared/types'
import { LoginDto, LoginResponse } from '../dtos'
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

    const isPasswordMatch = await HashUtil.verifyHash(data.password, isUserFound.password)

    if (!isPasswordMatch) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const tokenPayload = {
      _id: isUserFound._id,
    }

    const accessToken = await TokenUtil.generateAccessToken(tokenPayload)
    const refreshToken = await TokenUtil.generateRefreshToken(tokenPayload)

    await this.sessionService.createSession({ userId: isUserFound._id, accessToken, refreshToken, ipAddress, device })

    return {
      accessToken,
      refreshToken,
    }
  }

  async logOut(currentAccessToken: string): Promise<ResultMessage> {
    const foundSession = await this.sessionService.getSession(currentAccessToken)

    return await this.sessionService.deleteSession(foundSession._id)
  }
}
