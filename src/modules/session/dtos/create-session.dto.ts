import { IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateSessionDto {
  @Type(() => String)
  @IsNotEmpty()
  accessToken: string;

  @Type(() => String)
  @IsNotEmpty()
  refreshToken: string;

  @Type(() => String)
  @IsNotEmpty()
  ipAddress: string;

  @Type(() => Object)
  @IsNotEmpty()
  device: Record<string, unknown>;
}
