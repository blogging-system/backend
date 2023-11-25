import { Session } from 'src/modules/session/schemas'
import { User } from 'src/modules/user/schemas'

declare module 'express' {
  export interface CustomRequest extends Request {
    currentUser?: Partial<User>
    session?: Partial<Session>
  }
}
