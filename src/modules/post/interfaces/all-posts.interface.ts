import { Pagination } from '@src/shared/contracts/dtos'

export interface GetAllPostsDto {
  tagId?: string
  seriesId?: string
  isPublished?: boolean
  pagination: Pagination
}

export interface GetAllPostsQuery {
  tags?: string
  series?: string
  isPublished?: boolean
}
