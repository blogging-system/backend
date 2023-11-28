import { PublicSessionController, PrivateSessionController } from './controllers'
import { SessionRepository } from './repositories'
import { Session, SessionSchema } from './schemas'
import { MongooseModule } from '@nestjs/mongoose'
import { SessionService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
  exports: [SessionService, SessionRepository],
  providers: [SessionService, SessionRepository],
  controllers: [PublicSessionController, PrivateSessionController],
})
export class SessionModule {}
