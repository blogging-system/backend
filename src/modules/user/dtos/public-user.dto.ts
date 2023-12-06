import { Expose, Transform } from 'class-transformer'

export class PublicUserDto {
  @Expose()
  @Transform(({ key, obj }) => obj[key])
  _id: string

  @Expose()
  email: string

  @Expose()
  firstName: string

  @Expose()
  lastName: string
}
