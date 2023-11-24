import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthController } from './auth.controller'
import { User, UserSchema } from '../user/schemas/user.schema'
import { UserService } from '../user/services/user.service'
import { UserRepository } from '../user/repositories/user.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AuthService, UserService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
