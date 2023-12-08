import { ExecutionContext, createParamDecorator } from "@nestjs/common";
const DeviceDetector = require("node-device-detector");

const detector = new DeviceDetector();

export const DeviceInfo = createParamDecorator((data: never, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  const userAgent = req.headers["user-agent"] || "";

  return detector.detect(userAgent);
});
