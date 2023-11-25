import { Schema } from '@nestjs/mongoose'

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class BaseSchema {
  _id: string
}
