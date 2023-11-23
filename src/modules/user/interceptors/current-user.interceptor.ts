import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { MESSAGES } from '../constants';
import TokenHelper from 'src/shared/helpers/token.helper';
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    try {
      const request = context.switchToHttp().getRequest();

      const authorizationHeader = request.headers.authorization || null;

      if (!authorizationHeader)
        throw new NotFoundException(MESSAGES.AUTH_HEADER_NOT_FOUND);

      const accessToken = authorizationHeader.replace('Bearer ', '');

      const { _id, firstName, lastName } =
        TokenHelper.verifyAccessToken(accessToken);

      request.currentUser = {
        _id,
        firstName,
        lastName,
      };

      return next.handle();
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.INVALID_ACCESS_TOKEN);
    }
  }
}
