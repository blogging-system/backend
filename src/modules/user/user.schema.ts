import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';
import { ROLES } from './enums';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ index: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: [ROLES.ADMIN, ROLES.USER], default: ROLES.ADMIN, index: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
