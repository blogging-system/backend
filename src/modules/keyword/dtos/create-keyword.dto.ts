import { IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateKeywordDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string
}
