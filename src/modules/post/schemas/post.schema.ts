import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { BaseSchema } from 'src/shared/schemas'
import { Keyword } from '../../keyword/schemas'
import { Series } from '../../series/schemas'
import { Tag } from '../../tag/schemas'

export type PostDocument = HydratedDocument<Post>

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Post extends BaseSchema {
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

  @Prop({})
  isUnPublishedAt: Date
}

export const PostSchema = SchemaFactory.createForClass(Post)
