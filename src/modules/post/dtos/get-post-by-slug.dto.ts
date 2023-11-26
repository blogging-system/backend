import { Type } from 'class-transformer'

export class GetPostBySlug {
  @Type(() => String)
  slug: string

  @Type(() => String)
  isPublished?: boolean
}
