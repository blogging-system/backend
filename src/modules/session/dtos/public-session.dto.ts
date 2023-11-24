import { Expose } from 'class-transformer'

export class PublicSessionDto {
  @Expose()
  _id: string

  @Expose()
  ipAddress: string

  @Expose()
  device: object

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
