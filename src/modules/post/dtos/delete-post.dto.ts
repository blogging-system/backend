import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'
import { DocumentIdType } from '@src/shared/data/types'

export class DeletePostDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  postId: DocumentIdType
}
