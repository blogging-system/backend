import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { SessionService } from '../services'
import { Observable } from 'rxjs'

@Injectable()
export class ValidateSessionInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()

    await this.sessionService.isSessionValid(request?.currentUser?.sessionId)

    return next.handle()
  }
}
