import { CreatePostDto } from './create-post.dto'

export class PostManipulationDto extends CreatePostDto {
  _id: string
  slug?: string
  views?: number
  isPublished?: boolean
  publishedAt?: Date
  unPublishedAt?: Date
}
