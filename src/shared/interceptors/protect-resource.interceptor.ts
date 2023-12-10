import {
  CallHandler,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { TokenUtil } from "@src/shared/utils";
import { MESSAGES } from "@src/modules/auth/constants";
import { SessionService } from "@src/modules/session/services";
import { TokenTypes } from "../enums";
import { InvalidTokenTypeException } from "../exceptions";

@Injectable()
export class ProtectResourceInterceptor implements NestInterceptor {
  constructor(private readonly sessionService: SessionService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    try {
      const accessToken = req?.headers["authorization"]?.split(" ")[1];

      if (!accessToken) throw new NotFoundException(MESSAGES.ACCESS_TOKEN_NOT_FOUND);

      const { _id, type } = await TokenUtil.verifyAccessToken(accessToken);

      if (type !== TokenTypes.ACCESS_TOKEN) throw new InvalidTokenTypeException();

      req.currentUser = { _id };
      req.session = { accessToken };

      await this.sessionService.getSession({ accessToken });

      return next.handle();
    } catch (error) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN);
    }
  }
}
