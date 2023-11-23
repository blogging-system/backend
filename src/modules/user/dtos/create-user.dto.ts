import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Type(() => String)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  isRoot: boolean;
}
