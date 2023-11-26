import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { MESSAGES } from 'src/modules/auth/constants'
import { TokenHelper } from '../helpers'

@Injectable()
export class ProtectResourceInterceptor implements NestInterceptor {
  constructor() {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest()

    try {
      const accessToken = req?.headers['authorization']?.split(' ')[1] || null

      if (!accessToken) throw new NotFoundException(MESSAGES.ACCESS_TOKEN_NOT_FOUND)

      const { _id } = await TokenHelper.verifyAccessToken(accessToken)

      req.currentUser = { _id }
      req.session = { accessToken }

      return next.handle()
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN)
    }
  }
}
