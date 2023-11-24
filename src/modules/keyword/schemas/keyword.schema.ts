import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type KeywordDocument = HydratedDocument<Keyword>

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Keyword {
  @Prop({ index: true, unique: true })
  name: string
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword)
