import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ExpiryDuration } from "@src/shared/contracts/enums";
import { DocumentIdType } from "@src/shared/contracts/types";
import { HydratedDocument, Types } from "mongoose";
import { User } from "@src/modules/user/schemas";
import { BaseSchema } from "@src/shared/schemas";

export type LoginAttemptDocument = HydratedDocument<LoginAttempt>;

@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class LoginAttempt extends BaseSchema {
  @Prop({ type: Types.ObjectId, ref: User.name, index: true })
  userId: DocumentIdType;

  @Prop({ default: 1 })
  attemptsCount: number;

  @Prop({
    default: Date.now(),
    index: true,
    expires: +ExpiryDuration.TEN_MINUTES,
  })
  createdAt: Date;
}

export const LoginAttemptSchema = SchemaFactory.createForClass(LoginAttempt);
