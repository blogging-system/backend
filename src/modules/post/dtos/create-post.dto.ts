import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
  ValidateNested,
  arrayNotEmpty,
  arrayUnique,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePostDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  title: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  description: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  content: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  keywords: string[]

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  tags: string[]

  @IsMongoId({ each: true })
  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  series: string[]
}
