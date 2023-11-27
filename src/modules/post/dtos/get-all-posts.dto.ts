import { PostsFilter } from './posts-filter.dto'
import { Pagination } from 'src/shared/dtos'

export class GetAllPostsDto {
  filter?: PostsFilter
  pagination: Pagination
  isPublished?: boolean
  sortCondition?: string | { [key: string]: 1 | -1 }
  sortValue?: number
}

export class GetAllPostsQuery {
  tags?: string
  series?: string
  isPublished?: boolean
}
