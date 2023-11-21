import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogPostDocument = HydratedDocument<BlogPost>;

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
  collection: 'posts',
})
export class BlogPost {
  @Prop({ required: true, unique: true })
  title: string;
}

export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);
