import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SeriesDocument = HydratedDocument<Series>;

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Series {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ index: true, unique: true })
  title: string;

  @Prop({})
  slug: string;

  @Prop({})
  description: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
