import { IsNotEmpty, IsString, IsUrl } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateSeriesDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  title: string

  slug?: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  description: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string
}
