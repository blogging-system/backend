import { Type } from 'class-transformer'

export class IsSessionValidDto {
  @Type(() => String)
  sessionId?: string

  @Type(() => String)
  accessToken?: string

  @Type(() => String)
  refreshToken?: string
}
