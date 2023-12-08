import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/shared/schemas";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class User extends BaseSchema {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ Type: String, unique: true, index: true })
  userName: string;

  @Prop({ Type: String, unique: true, index: true })
  email: string;

  @Prop({ Type: String })
  password: string;

  @Prop({ type: [String] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
