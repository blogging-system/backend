import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'

export class LoginDto {
  @Type(() => String)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  @MaxLength(50, { message: 'Email cannot be longer than 50 characters' })
  email: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(30, { message: 'Password cannot be longer than 30 characters' })
  password: string
}
