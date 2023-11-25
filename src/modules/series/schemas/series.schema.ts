import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema } from 'src/shared/schemas'
import { HydratedDocument } from 'mongoose'

export type SeriesDocument = HydratedDocument<Series>

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Series extends BaseSchema {
  @Prop({ index: true, unique: true })
  title: string

  @Prop({})
  slug: string

  @Prop({})
  description: string
}

export const SeriesSchema = SchemaFactory.createForClass(Series)
