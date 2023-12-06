import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateKeywordDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'name must be at least 3 characters long' })
  @MaxLength(20, { message: 'name cannot be longer than 20 characters' })
  name: string
}
