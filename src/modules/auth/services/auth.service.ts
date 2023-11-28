import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../../user/services/user.service'
import { SessionService } from '../../session/services'
import { HashUtil, TokenUtil } from 'src/shared/utils'
import { ResultMessage } from 'src/shared/types'
import { LoginResponse } from '../types'
import { MESSAGES } from '../constants'
import { LoginDto } from '../dtos'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  public async login(data: LoginDto, ipAddress: string, device: Record<string, unknown>): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail(data.email)

    if (!user) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const isPasswordMatch = await HashUtil.verifyHash(data.password, user.password)

    if (!isPasswordMatch) throw new UnauthorizedException(MESSAGES.WRONG_EMAIL_OR_PASSWORD)

    const tokenPayload = {
      _id: user._id,
    }

    const accessToken = await TokenUtil.generateAccessToken(tokenPayload)
    const refreshToken = await TokenUtil.generateRefreshToken(tokenPayload)

    await this.sessionService.createSession({ accessToken, refreshToken, ipAddress, device })

    return {
      accessToken,
      refreshToken,
    }
  }

  public async logOut(accessToken: string): Promise<ResultMessage> {
    const { _id } = await this.sessionService.getSession({ accessToken })

    return await this.sessionService.deleteSession(_id)
  }
}
