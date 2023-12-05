import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePostDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'title must be at least 20 characters long' })
  @MaxLength(300, { message: 'title cannot be longer than 300 characters' })
  title: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'description must be at least 20 characters long' })
  @MaxLength(500, { message: 'description cannot be longer than 500 characters' })
  description: string

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'content must be at least 20 characters long' })
  @MaxLength(10000, { message: 'content cannot be longer than 10_000 characters' })
  content: string

  @Type(() => String)
  @IsNotEmpty()
  @IsUrl()
  @MaxLength(1000, { message: 'imageUrl cannot be longer than 1000 characters' })
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
