import { Type } from 'class-transformer'
import { IsNotEmpty, IsString, Length, Max } from 'class-validator'

export class RegenerateSessionDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  refreshToken: string
}
