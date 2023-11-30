import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchema } from '@src/shared/schemas'
import { HydratedDocument } from 'mongoose'

export type TagDocument = HydratedDocument<Tag>

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Tag extends BaseSchema {
  @Prop({ index: true, unique: true })
  name: string
}

export const TagSchema = SchemaFactory.createForClass(Tag)
