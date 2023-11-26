import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class DeletePostDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  postId: string
}
