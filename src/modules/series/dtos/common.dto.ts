import { CreateSeriesDto } from './create-series.dto'

export class SeriesManipulationDto extends CreateSeriesDto {
  _id: string
  slug?: string
  isPublished?: boolean
  isPublishedAt?: Date
  isUnPublishedAt?: Date
}
