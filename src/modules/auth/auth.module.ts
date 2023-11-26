import { PublicAuthController, PrivateAuthController } from './controllers'
import { SessionModule } from '../session/session.module'
import { SessionService } from '../session/services'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/services'
import { AuthService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [UserModule, SessionModule],
  providers: [AuthService, UserService, SessionService],
  controllers: [PublicAuthController, PrivateAuthController],
})
export class AuthModule {}
