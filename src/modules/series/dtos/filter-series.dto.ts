import { IsMongoId, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class FilterSeriesDto {
  @IsOptional()
  @Type(() => String)
  @IsMongoId()
  tagId?: string;
}
