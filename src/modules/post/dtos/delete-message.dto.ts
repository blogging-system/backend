import { Type } from 'class-transformer'

export class DeletePostResponse {
  @Type(() => String)
  message: string
}
