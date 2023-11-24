import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { ExpiryDuration } from 'src/shared/enums'
import { User } from '../../user/schemas'

export type SessionDocument = HydratedDocument<Session>

@Schema({
  timestamps: true,
  versionKey: false,
  autoCreate: true,
})
export class Session {
  @Prop({ type: Types.ObjectId, ref: User.name, index: true })
  userId: User

  @Prop()
  accessToken: string

  @Prop()
  refreshToken: string

  @Prop()
  ipAddress: string

  @Prop({ type: Map, of: SchemaTypes.Mixed })
  device: Record<string, unknown>

  @Prop({
    default: Date.now(),
    index: true,
    expires: ExpiryDuration.TWENTY_FOUR_HOURS,
  })
  createdAt: Date
}

export const SessionSchema = SchemaFactory.createForClass(Session)
