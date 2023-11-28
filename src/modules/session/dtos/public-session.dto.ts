import { Expose } from 'class-transformer'

export class PublicSessionDto {
  @Expose()
  accessToken: string

  @Expose()
  refreshToken: string
}
