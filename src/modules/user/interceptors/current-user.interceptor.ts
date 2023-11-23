import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { MESSAGES } from '../constants';
import TokenHelper from 'src/shared/helpers/token.helper';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers.authorization || null;

    if (!authorizationHeader) {
      throw new NotFoundException(MESSAGES.AUTH_HEADER_NOT_FOUND);
    }

    const accessToken = authorizationHeader.replace('Bearer ', '');

    const decoded = TokenHelper.verifyAccessToken(accessToken);
    console.log({ decoded });

    // request.currentUser = await this.userService.findUserById(userId);

    return next.handle();
  }
}
