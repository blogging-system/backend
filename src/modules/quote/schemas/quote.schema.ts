import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema } from 'src/shared/schemas'
import { HydratedDocument } from 'mongoose'

export type QuoteDocument = HydratedDocument<Quote>

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Quote extends BaseSchema {
  @Prop()
  text: string

  @Prop()
  author: string
}

export const QuoteSchema = SchemaFactory.createForClass(Quote)
