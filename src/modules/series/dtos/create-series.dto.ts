import { IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateSeriesDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  title: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  description: string
}
