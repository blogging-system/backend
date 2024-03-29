import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { UserTypes } from "../enums";

export class CreateUserDto {
  @Type(() => String)
  @IsString({ message: "First name must be a string" })
  @IsNotEmpty({ message: "First name is required" })
  @MinLength(3, { message: "First name must be at least 3 characters long" })
  @MaxLength(10, { message: "First name cannot be longer than 10 characters" })
  firstName: string;

  @Type(() => String)
  @IsString({ message: "Last name must be a string" })
  @IsNotEmpty({ message: "Last name is required" })
  @MinLength(3, { message: "Last name must be at least 3 characters long" })
  @MaxLength(10, { message: "Last name cannot be longer than 10 characters" })
  lastName: string;

  @Type(() => String)
  @IsString({ message: "Username must be a string" })
  @IsNotEmpty({ message: "Username is required" })
  @MinLength(3, { message: "Username must be at least 3 characters long" })
  @MaxLength(30, { message: "Username cannot be longer than 30 characters" })
  userName: string;

  @Type(() => String)
  @IsString({ message: "Email must be a string" })
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  @MinLength(10, { message: "Email must be at least 10 characters long" })
  @MaxLength(30, { message: "Email cannot be longer than 30 characters" })
  email: string;

  @Type(() => String)
  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(4, { message: "Password must be at least 4 characters long" })
  @MaxLength(30, { message: "Password cannot be longer than 30 characters" })
  password: string;

  type: UserTypes;

  verificationToken: string;

  isVerified: boolean;

  verifiedAt: Date;
}
