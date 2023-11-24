import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class GetAllPosts {
  @IsOptional()
  @Type(() => String)
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  tagId?: string

  @IsOptional()
  @Type(() => String)
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  seriesId?: string
}
