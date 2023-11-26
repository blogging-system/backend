import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { SessionService } from '../services'
import { CustomRequest } from 'express'
import { Observable } from 'rxjs'

const excludePaths = ['/auth/login', '/ping', '/']

@Injectable()
export class ValidateSessionInterceptor implements NestInterceptor {
  constructor(private sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest() as CustomRequest

    if (excludePaths.includes(request.path)) return next.handle()

    await this.sessionService.isSessionValid(request?.session?.accessToken)

    return next.handle()
  }
}
