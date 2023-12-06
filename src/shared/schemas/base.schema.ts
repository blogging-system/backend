import { DocumentIdType } from '@src/shared/data/types'
import { Prop, Schema } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema()
export class BaseSchema {
  @Prop({ type: Types.ObjectId })
  _id: DocumentIdType
}
