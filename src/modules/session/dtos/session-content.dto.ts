import { Expose } from 'class-transformer'

export class SessionContentDto {
  @Expose()
  accessToken: string

  @Expose()
  refreshToken: string
}
