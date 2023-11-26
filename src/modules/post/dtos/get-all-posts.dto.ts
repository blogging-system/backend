import { PostsFilter } from './posts-filter.dto'
import { Pagination } from 'src/shared/dtos'

export class GetAllPostsDto {
  filter: PostsFilter
  pagination: Pagination
  isPublished?: boolean
}
