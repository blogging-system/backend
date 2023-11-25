import { Expose, Transform } from 'class-transformer'

export class PublicSessionDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: string

  @Expose()
  @Transform((value) => value.obj.userId.toString())
  userId: string

  @Expose()
  ipAddress: string

  @Expose()
  device: object

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date
}
