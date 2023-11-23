import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ index: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  isAdmin: boolean;

  @Prop({ default: false })
  isRoot: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
