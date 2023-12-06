import { IsNotEmpty, IsString } from 'class-validator'
import { DocumentIdType } from '@src/shared/contracts/types'

export class DeleteSeriesDto {
  @IsString()
  @IsNotEmpty()
  seriesId: DocumentIdType
}
