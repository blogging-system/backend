import { successMessages } from './successMessages.constants'
import { failureMessages } from './failureMessages.constants'

export * from './environment.constant'
export const MESSAGES = {
  ...successMessages,
  ...failureMessages,
}
