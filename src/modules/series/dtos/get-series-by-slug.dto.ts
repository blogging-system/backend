import { Type } from 'class-transformer'

export class GetSeriesBySlug {
  @Type(() => String)
  slug: string

  @Type(() => String)
  isPublished?: boolean
}
