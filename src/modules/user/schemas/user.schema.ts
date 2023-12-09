import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/shared/schemas";
import { HydratedDocument } from "mongoose";
import { ROLES } from "../enums";

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

  @Prop({ type: [String], enum: Object.values(ROLES), default: [ROLES.GUEST], index: true })
  roles: string[];

  @Prop({ Type: String })
  verificationToken: string;

  @Prop({ type: Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: Date })
  verifiedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
