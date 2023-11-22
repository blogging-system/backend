import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Pagination {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  pageNumber: number = 1;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Max(20)
  pageSize: number = 20;

  @Type(() => Number)
  @IsNumber()
  @IsIn([1, -1], { message: 'Sort value must be 1 or -1.' })
  sort: number = 1;

  @IsOptional()
  @Type(() => String)
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  tagId?: string;

  @IsOptional()
  @Type(() => String)
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  seriesId?: string;

  @IsOptional()
  @Type(() => String)
  @IsNotEmpty({ each: true })
  @IsMongoId({ each: true })
  keywordId?: string;
}
