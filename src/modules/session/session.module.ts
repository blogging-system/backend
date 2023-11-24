import { SessionRepository } from './repositories'
import { Session, SessionSchema } from './schemas'
import { MongooseModule } from '@nestjs/mongoose'
import { SessionController } from './controllers'
import { SessionService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
  providers: [SessionService, SessionRepository],
  controllers: [SessionController],
})
export class SessionModule {}
