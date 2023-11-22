import { Keyword, KeywordSchema } from './keyword.schema';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }]),
  ],
  providers: [KeywordService],
  controllers: [KeywordController],
})
export class KeywordModule {}
