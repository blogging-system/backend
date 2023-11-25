import { Expose } from 'class-transformer'

export class TokensSessionDto {
  @Expose()
  accessToken: string

  @Expose()
  refreshToken: string
}
