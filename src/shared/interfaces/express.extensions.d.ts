import { Session } from '@src/domain/modules/session/schemas'
import { User } from '@src/domain/modules/user/schemas'

declare module 'express' {
  export interface CustomRequest extends Request {
    currentUser?: Partial<User>
    session?: Partial<Session>
  }
}
