import { CreateSeriesDto } from './create-series.dto'

export class SeriesManipulationDto extends CreateSeriesDto {
  isPublished?: boolean
  isPublishedAt?: Date
  isUnPublishedAt?: Date
}
