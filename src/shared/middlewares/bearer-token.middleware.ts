import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { CustomRequest, NextFunction, Response } from 'express'
import { MESSAGES } from 'src/modules/auth/constants'
import { TokenHelper } from '../helpers/token.helper'

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    const excludeRoutes = ['/auth/login', '/ping']

    if (excludeRoutes.includes(req.url) || req.url === '/') return next()

    try {
      const accessToken = req?.headers['authorization']?.split(' ')[1] || null

      if (!accessToken) throw new NotFoundException(MESSAGES.ACCESS_TOKEN_NOT_FOUND)

      const { _id } = await TokenHelper.verifyAccessToken(accessToken)

      req.currentUser = { _id }
      req.session = { accessToken }

      return next()
    } catch (error) {
      console.log({ error })
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN)
    }
  }
}
