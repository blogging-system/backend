import { PublicKeywordController, PrivateKeywordController } from "./controllers";
import { SessionModule } from "../session/session.module";
import { Module, forwardRef } from "@nestjs/common";
import { KeywordRepository } from "./repositories";
import { Keyword, KeywordSchema } from "./schemas";
import { MongooseModule } from "@nestjs/mongoose";
import { PostModule } from "../post/post.module";
import { KeywordService } from "./services";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }]),
    forwardRef(() => PostModule),
    SessionModule,
  ],
  exports: [KeywordService, KeywordRepository],
  providers: [KeywordService, KeywordRepository],
  controllers: [PublicKeywordController, PrivateKeywordController],
})
export class KeywordModule {}
