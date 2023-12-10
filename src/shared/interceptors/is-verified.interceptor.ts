import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { NotVerifiedException } from "../exceptions";
import { Observable } from "rxjs";

@Injectable()
export class AccountVerificationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const isAccountVerified = req.currentUser?.isVerified;

    if (!isAccountVerified) throw new NotVerifiedException();

    return next.handle();
  }
}
