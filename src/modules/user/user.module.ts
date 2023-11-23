import { UserController } from './user.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { Module, OnModuleInit } from '@nestjs/common';
import { UserSeederService } from './services/user-seeder.service';
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
      firstName: process.env.FIRST_NAME,
      lastName: process.env.LAST_NAME,
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
      isRoot: true,
    };

    await this.userSeederService.seedRootUser(rootUser);
  }
}
