import { PublicAuthController, PrivateAuthController } from "./controllers";
import { AuthService, LoginAttemptService } from "./services";
import { LoginAttempt, LoginAttemptSchema } from "./schemas";
import { SessionModule } from "../session/session.module";
import { LoginAttemptRepository } from "./repositories";
import { SessionService } from "../session/services";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/services";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LoginAttempt.name, schema: LoginAttemptSchema }]),
    UserModule,
    SessionModule,
  ],
  providers: [AuthService, UserService, SessionService, LoginAttemptService, LoginAttemptRepository],
  controllers: [PublicAuthController, PrivateAuthController],
})
export class AuthModule {}
