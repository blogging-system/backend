import { Pagination } from 'src/shared/dtos'

export class GetAllSeriesDto {
  pagination: Pagination
  isPublished?: boolean
}
