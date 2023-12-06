import { IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateQuoteDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  text: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  author: string
}
