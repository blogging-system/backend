import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SeriesDocument = HydratedDocument<Series>;

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Series {
  @Prop({ index: true, unique: true })
  name: string;

  @Prop({})
  slug: string;

  @Prop({})
  description: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
