import { IsNotEmpty, IsString, Length } from 'class-validator'
import { Type } from 'class-transformer'

export class RegenerateSessionDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  refreshToken: string
}
