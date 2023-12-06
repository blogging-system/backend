import { IsNotEmpty, IsString } from 'class-validator'
import { DocumentIdType } from '@src/shared/data/types'

export class DeleteSeriesDto {
  @IsString()
  @IsNotEmpty()
  seriesId: DocumentIdType
}
