import { Pagination } from 'src/shared/dtos'

export class GetAllSeriesDto {
  pagination: Pagination
  isPublished?: boolean
  sortCondition?: string | { [key: string]: 1 | -1 }
  sortValue?: number
}
