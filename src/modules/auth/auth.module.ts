import { Session, SessionSchema } from '../session/schemas'
import { SessionRepository } from '../session/repositories'
import { UserRepository } from '../user/repositories'
import { SessionService } from '../session/services'
import { User, UserSchema } from '../user/schemas'
import { AuthController } from './auth.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from '../user/services'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Session.name, schema: SessionSchema },
    ]),
  ],
  providers: [AuthService, UserService, UserRepository, SessionService, SessionRepository],
  controllers: [AuthController],
})
export class AuthModule {}
