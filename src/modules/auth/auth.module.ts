import { SessionModule } from '../session/session.module'
import { SessionService } from '../session/services'
import { UserModule } from '../user/user.module'
import { AuthController } from './controllers'
import { UserService } from '../user/services'
import { AuthService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserModule, SessionModule],
  providers: [AuthService, UserService, SessionService],
  controllers: [AuthController],
})
export class AuthModule {}
