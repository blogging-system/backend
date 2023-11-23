import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type KeywordDocument = HydratedDocument<Keyword>;

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Keyword {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ index: true, unique: true })
  name: string;
}

export const KeywordSchema = SchemaFactory.createForClass(Keyword);
