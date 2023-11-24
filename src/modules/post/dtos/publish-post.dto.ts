import { CreatePostDto } from './create-post.dto'
import { Type } from 'class-transformer'

export class PublishPostDto extends CreatePostDto {
  @Type(() => Boolean)
  isPublished: boolean

  @Type(() => Date)
  isPublishedAt: Date
}
