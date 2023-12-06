import { HydratedDocument, SchemaTypes, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ExpiryDuration } from '@src/shared/contracts/enums'
import { BaseSchema } from '@src/shared/schemas'

export type SessionDocument = HydratedDocument<Session>


@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class Session extends BaseSchema {
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
