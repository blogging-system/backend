import { Type } from 'class-transformer'

export class GetSessionDto {
  @Type(() => String)
  sessionId?: string

  @Type(() => String)
  accessToken?: string

  @Type(() => String)
  refreshToken?: string
}

export class GetSessionQuery extends GetSessionDto {}
