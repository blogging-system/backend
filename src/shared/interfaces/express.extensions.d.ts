import { User } from 'src/modules/user/schemas/user.schema'

declare module 'express' {
  interface Request {
    currentUser?: partial<User>
  }
}
