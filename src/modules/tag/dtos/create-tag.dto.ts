import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTagDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;
}
