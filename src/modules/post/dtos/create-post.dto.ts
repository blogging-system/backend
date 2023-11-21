import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;
}
