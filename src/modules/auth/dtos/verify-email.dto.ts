import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Type } from "class-transformer";

export class VerifyEmailDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000, { message: "verificationToken cannot be longer than 5000 characters" })
  verificationToken: string;
}
