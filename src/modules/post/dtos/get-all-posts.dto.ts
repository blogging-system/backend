import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'
import { Type } from 'class-transformer'

export class GetAllPostsFilter {
  @Type(() => String)
  @IsNotEmpty({ each: true })
  @IsMongoId()
  @IsOptional()
  tagId?: string

  @Type(() => String)
  @IsNotEmpty({ each: true })
  @IsMongoId()
  @IsOptional()
  seriesId?: string
}
