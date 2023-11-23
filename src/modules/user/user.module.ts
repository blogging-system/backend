import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { UserSeederService } from './services/user-seeder.service';
import { appConfig } from 'src/shared/config';
import { CreateUserDto } from './dtos';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserSeederService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly userSeederService: UserSeederService) {}

  async onModuleInit() {
    const rootUser: CreateUserDto = {
      firstName: appConfig.seeders.rootUser.firstName,
      lastName: appConfig.seeders.rootUser.lastName,
      email: appConfig.seeders.rootUser.email,
      password: appConfig.seeders.rootUser.password,
      isRoot: true,
    };
    console.log({ rootUser });
    await this.userSeederService.seedRootUser(rootUser);
  }
}
