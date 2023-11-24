import { UserSeederService, UserService } from './services'
import { Module, OnModuleInit } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserRepository } from './repositories'
import { UserController } from './controllers'
import { User, UserSchema } from './schemas'
import { adminUser } from './data'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [UserService, UserRepository],
  providers: [UserService, UserRepository, UserSeederService],
  controllers: [UserController],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userSeederService: UserSeederService) {}

  async onModuleInit(): Promise<void> {
    await this.userSeederService.seedRootUser(adminUser)
  }
}
