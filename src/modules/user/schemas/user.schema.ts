import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { BaseSchema } from 'src/shared/schemas'

export type UserDocument = HydratedDocument<User>
@Schema({ timestamps: true, versionKey: false, autoCreate: true })
export class User extends BaseSchema {
  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop({ index: true, unique: true })
  email: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
