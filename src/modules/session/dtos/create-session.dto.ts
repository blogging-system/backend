import { Type } from 'class-transformer'

export class CreateSessionDto {
  @Type(() => String)
  userId: string

  @Type(() => String)
  accessToken: string

  @Type(() => String)
  refreshToken: string

  @Type(() => String)
  ip: string

  @Type(() => Object)
  device: object
}
