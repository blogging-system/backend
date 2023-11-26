import { PublicKeywordController, PrivateKeywordController } from './controllers'
import { SessionModule } from '../session/session.module'
import { KeywordRepository } from './repositories'
import { Keyword, KeywordSchema } from './schemas'
import { MongooseModule } from '@nestjs/mongoose'
import { KeywordService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }]), SessionModule],
  exports: [KeywordService, KeywordRepository],
  providers: [KeywordService, KeywordRepository],
  controllers: [PublicKeywordController, PrivateKeywordController],
})
export class KeywordModule {}
