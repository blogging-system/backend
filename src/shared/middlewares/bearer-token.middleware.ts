import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { MESSAGES } from 'src/modules/auth/constants'
import { TokenHelper } from '../helpers/token.helper'

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('from middleware!')

    try {
      const accessToken = req?.headers['authorization']?.split(' ')[1] || null

      if (!accessToken) throw new NotFoundException(MESSAGES.ACCESS_TOKEN_NOT_FOUND)

      const { _id, role } = TokenHelper.verifyAccessToken(accessToken)

      req.currentUser = {
        _id,
        role,
      }

      req.session = {
        accessToken,
      }

      return next()
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN)
    }
  }
}
