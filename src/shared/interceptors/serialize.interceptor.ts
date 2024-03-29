import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { ClassConstructor } from "@src/shared/contracts/interfaces";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // only return fields with @Expose !!!!
        });
      }),
    );
  }
}
