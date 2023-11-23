import { UserSeederService } from './services/user-seeder.service';
import { UserService } from './services/user.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { appConfig } from 'src/shared/config';
import { CreateUserDto } from './dtos';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserSeederService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userSeederService: UserSeederService) {}

  async onModuleInit(): Promise<void> {
    const rootUser: CreateUserDto = {
      firstName: appConfig.seeders.rootUser.firstName,
      lastName: appConfig.seeders.rootUser.lastName,
      email: appConfig.seeders.rootUser.email,
      password: appConfig.seeders.rootUser.password,
    };

    await this.userSeederService.seedRootUser(rootUser);
  }
}
