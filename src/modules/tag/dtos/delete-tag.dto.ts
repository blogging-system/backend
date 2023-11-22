import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteTagDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  tagId: string;
}
