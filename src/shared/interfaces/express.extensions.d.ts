import { Session } from 'src/modules/session/schemas'
import { User } from 'src/modules/user/schemas'

declare module 'express' {
  interface Request {
    currentUser?: Partial<User>
    session?: Partial<Session>
  }
}
