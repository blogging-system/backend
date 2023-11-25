import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { SessionService } from '../services'
import { Observable } from 'rxjs'
import { CustomRequest } from 'express'

const excludePaths = ['/auth/login', '/ping']

@Injectable()
export class ValidateSessionInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as CustomRequest

    if (excludePaths.includes(request.url) || request.url === '/') return next.handle()

    console.log('passed!')
    await this.sessionService.isSessionValid(request?.currentUser?._id)

    return next.handle()
  }
}
