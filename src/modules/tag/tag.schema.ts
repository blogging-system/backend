import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Tag {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ index: true, unique: true })
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
