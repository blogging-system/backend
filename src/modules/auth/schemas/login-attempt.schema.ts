import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ExpiryDuration } from '@src/shared/enums'
import { BaseSchema } from '@src/shared/schemas'
import { HydratedDocument } from 'mongoose'

export type LoginAttemptDocument = HydratedDocument<LoginAttempt>
@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class LoginAttempt extends BaseSchema {
  @Prop({ default: 1 })
  attemptsCount: number

  @Prop({
    default: Date.now(),
    index: true,
    expires: +ExpiryDuration.TEN_MINUTES,
  })
  createdAt: Date
}

export const LoginAttemptSchema = SchemaFactory.createForClass(LoginAttempt)
