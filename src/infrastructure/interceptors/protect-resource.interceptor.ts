import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { TokenUtil } from '@src/shared/utils'
import { MESSAGES } from '@src/domain/modules/auth/constants'
import { SessionService } from '@src/domain/modules/session/services'

@Injectable()
export class ProtectResourceInterceptor implements NestInterceptor {
  constructor(private readonly sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest()

    try {
      const accessToken = req?.headers['authorization']?.split(' ')[1]

      if (!accessToken) throw new NotFoundException(MESSAGES.ACCESS_TOKEN_NOT_FOUND)

      const { _id } = await TokenUtil.verifyAccessToken(accessToken)

      req.currentUser = { _id }
      req.session = { accessToken }

      await this.sessionService.getSession({ accessToken })

      return next.handle()
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN)
    }
  }
}
