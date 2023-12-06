import { PostsFilter } from './posts-filter.interface'
import { Pagination } from '@src/shared/contracts/dtos'

export interface GetAllPostsDto {
  filter?: PostsFilter
  pagination: Pagination
  isPublished?: boolean
  sortCondition?: string | { [key: string]: 1 | -1 }
  sortValue?: number
}

export interface GetAllPostsQuery {
  tags?: string
  series?: string
  isPublished?: boolean
}
