import { IsMongoId, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class FilterPostDto {
  @IsOptional()
  @Type(() => String)
  @IsMongoId()
  tagId?: string;

  @IsOptional()
  @Type(() => String)
  @IsMongoId()
  seriesId?: string;
}
