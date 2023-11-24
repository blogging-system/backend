import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { SessionService } from '../services'
import { Observable } from 'rxjs'

const excludePaths = ['/auth/login']

@Injectable()
export class ValidateSessionInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest()

    if (excludePaths.includes(request.url)) return next.handle()

    console.log('hi')
    await this.sessionService.isSessionValid(request?.currentUser?._id, request?.session?.accessToken)

    return next.handle()
  }
}
