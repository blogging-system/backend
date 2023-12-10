import { PublicTagController, PrivateTagController } from "./controllers";
import { SessionModule } from "../session/session.module";
import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostModule } from "../post/post.module";
import { TagRepository } from "./repositories";
import { Tag, TagSchema } from "./schemas";
import { TagService } from "./services";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    forwardRef(() => PostModule),
    SessionModule,
    UserModule
  ],
  exports: [TagService, TagRepository],
  controllers: [PublicTagController, PrivateTagController],
  providers: [TagService, TagRepository],
})
export class TagModule {}
