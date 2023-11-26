import { Type } from 'class-transformer'

export class BasePublishDto {
  @Type(() => Boolean)
  isPublished: boolean
}
