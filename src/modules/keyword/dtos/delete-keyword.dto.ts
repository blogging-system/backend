import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteKeywordDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  keywordId: string;
}
