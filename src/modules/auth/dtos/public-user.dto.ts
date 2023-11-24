import { Expose } from 'class-transformer'

export class PublicUserDto {
  @Expose()
  _id: string

  @Expose()
  email: string

  @Expose()
  firstName: string

  @Expose()
  lastName: string

  @Expose()
  role: string

  @Expose()
  accessToken: string

  @Expose()
  refreshToken: string
}
