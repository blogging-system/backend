import { CreatePostDto } from './create-post.dto'

export class PostManipulationDto extends CreatePostDto {
  _id: string
  slug?: string
  isPublished?: boolean
  isPublishedAt?: Date
  isUnPublishedAt?: Date
}
