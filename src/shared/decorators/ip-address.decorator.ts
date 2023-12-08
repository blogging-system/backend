import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import * as requestIp from "request-ip";

export const IpAddress = createParamDecorator((data: never, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  if (req.clientIp) return req.clientIp;

  return requestIp.getClientIp(req);
});
