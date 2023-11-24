import { Expose } from 'class-transformer'

export class PublicSessionDto {
  @Expose()
  _id: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
