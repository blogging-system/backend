import { Session } from '@src/app/session/schemas'
import { User } from '@src/app/user/schemas'

declare module 'express' {
  export interface CustomRequest extends Request {
    currentUser?: Partial<User>
    session?: Partial<Session>
  }
}
