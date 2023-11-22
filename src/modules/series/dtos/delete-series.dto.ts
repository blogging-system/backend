import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteSeriesDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  seriesId: string;
}
