import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/shared/schemas";
import { HydratedDocument } from "mongoose";

export type SeriesDocument = HydratedDocument<Series>;

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Series extends BaseSchema {
  @Prop({ unique: true })
  title: string;

  @Prop({ index: true })
  slug: string;

  @Prop({})
  description: string;

  @Prop({})
  imageUrl: string;

  @Prop({ index: true, default: 0 })
  views: number;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({})
  publishedAt: Date;

  @Prop({})
  unPublishedAt: Date;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
