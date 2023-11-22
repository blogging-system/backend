import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Tag } from '../tag/tag.schema';
import { Series } from '../series/series.schema';
import { Keyword } from '../keyword/keyword.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Post {
  @Prop({ index: true, unique: true })
  title: string;

  @Prop({})
  slug: string;

  @Prop({})
  description: string;

  @Prop({})
  content: string;

  @Prop({ type: [Types.ObjectId], ref: Tag.name })
  tags: Tag[];

  @Prop({ type: [Types.ObjectId], ref: Keyword.name })
  keywords: Keyword[];

  @Prop({ type: [Types.ObjectId], ref: Series.name })
  series: Series[];

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({})
  isPublishedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
