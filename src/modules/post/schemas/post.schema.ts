import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BaseSchema } from "@src/shared/schemas";
import { Keyword } from "../../keyword/schemas";
import { Series } from "../../series/schemas";
import { Tag } from "../../tag/schemas";
import { DocumentIdType } from "@src/shared/contracts/types";

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Post extends BaseSchema {
  @Prop({ index: true, unique: true })
  title: string;

  @Prop({ index: true })
  slug: string;

  @Prop({})
  description: string;

  @Prop({})
  content: string;

  @Prop({})
  imageUrl: string;

  @Prop({ type: [Types.ObjectId], ref: Tag.name })
  tags: DocumentIdType[];

  @Prop({ type: [Types.ObjectId], ref: Keyword.name })
  keywords: DocumentIdType[];

  @Prop({ type: [Types.ObjectId], ref: Series.name })
  series: DocumentIdType[];

  @Prop({ index: true, default: 0 })
  views: number;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({})
  publishedAt: Date;

  @Prop({})
  unPublishedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
