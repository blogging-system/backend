import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SessionService } from './session.service'
import { SessionController } from './session.controller'
import { Session, SessionSchema } from './session.schema'
import { SessionRepository } from './repositories'

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
  providers: [SessionService, SessionRepository],
  controllers: [SessionController],
})
export class SessionModule {}
