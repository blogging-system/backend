import { SerializeInterceptor } from '../interceptors'
import { ClassConstructor } from '../interfaces'
import { UseInterceptors } from '@nestjs/common'

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
