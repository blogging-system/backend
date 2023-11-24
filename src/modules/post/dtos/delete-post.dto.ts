import { Type } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class DeletePostDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  postId: string
}
