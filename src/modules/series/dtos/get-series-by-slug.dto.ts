import { IsNotEmpty, IsString, Length } from "class-validator";
import { Type } from "class-transformer";

export class GetSeriesBySlug {
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(3, 50, { message: "Slug must be between 3 and 50 characters" })
  slug: string;

  isPublished?: boolean;
}
