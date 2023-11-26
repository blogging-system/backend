import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
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

  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  keywords: string[]

  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  tags: string[]

  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  series: string[]
}
