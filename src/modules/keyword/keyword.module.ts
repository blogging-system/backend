import { KeywordRepository } from './repositories'
import { Keyword, KeywordSchema } from './schemas'
import { MongooseModule } from '@nestjs/mongoose'
import { KeywordController } from './controllers'
import { KeywordService } from './services'
import { Module } from '@nestjs/common'

@Module({
  imports: [MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }])],
  exports: [KeywordService, KeywordRepository],
  providers: [KeywordService, KeywordRepository],
  controllers: [KeywordController],
})
export class KeywordModule {}
