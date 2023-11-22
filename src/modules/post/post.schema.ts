import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({})
  isPublishedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
