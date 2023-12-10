
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class VerificationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // Check if the user is authenticated and verified
    if (req.user && req.user.isVerified) {
      return next.handle();
    } else {
      // You can customize the response or throw an exception as needed
      
    }
  }
}
