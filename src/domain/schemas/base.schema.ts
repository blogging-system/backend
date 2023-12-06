import { Prop, Schema } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'

@Schema()
export class BaseSchema {
  // @Prop({ type: SchemaTypes.ObjectId })
  // _id: Types.ObjectId

  _id: string
}
