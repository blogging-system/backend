import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema } from '@src/shared/schemas'
import { HydratedDocument } from 'mongoose'

export type KeywordDocument = HydratedDocument<Keyword>

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Keyword extends BaseSchema {
  @Prop({ index: true, unique: true })
  name: string
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword)
