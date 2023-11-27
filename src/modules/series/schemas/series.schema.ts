import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema } from 'src/shared/schemas'
import { HydratedDocument } from 'mongoose'

export type SeriesDocument = HydratedDocument<Series>

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Series extends BaseSchema {
  @Prop({ unique: true })
  title: string

  @Prop({ index: true })
  slug: string

  @Prop({})
  description: string

  @Prop({})
  imageUrl: string

  @Prop({ default: false })
  isPublished: boolean

  @Prop({})
  isPublishedAt: Date

  @Prop({})
  isUnPublishedAt: Date
}

export const SeriesSchema = SchemaFactory.createForClass(Series)
