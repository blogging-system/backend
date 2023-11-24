import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Keyword } from '../keyword/schemas/keyword.schema'
import { HydratedDocument, Types } from 'mongoose'
import { Series } from '../series/schemas/series.schema'
import { Tag } from '../tag/schemas/tag.schema'

export type PostDocument = HydratedDocument<Post>

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Post {
  @Prop({ index: true, unique: true })
  title: string

  @Prop({ index: true })
  slug: string

  @Prop({})
  description: string

  @Prop({})
  content: string

  @Prop({ type: [Types.ObjectId], ref: Tag.name })
  tags: Tag[]

  @Prop({ type: [Types.ObjectId], ref: Keyword.name })
  keywords: Keyword[]

  @Prop({ type: [Types.ObjectId], ref: Series.name })
  series: Series[]

  @Prop({ default: false })
  isPublished: boolean

  @Prop({})
  isPublishedAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)
