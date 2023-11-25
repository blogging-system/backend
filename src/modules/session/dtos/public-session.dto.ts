import { Exclude, Expose, Transform } from 'class-transformer'

export class PublicSessionDto {
  @Expose()
  @Transform((params) => params.obj._id)
  _id: string

  // @Exclude()
  @Expose()
  @Transform((params) => params.obj._id)
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
