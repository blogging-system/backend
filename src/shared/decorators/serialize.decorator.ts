import { ClassConstructor } from '@src/shared/data/interfaces'
import { SerializeInterceptor } from '../interceptors'
import { UseInterceptors } from '@nestjs/common'

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
