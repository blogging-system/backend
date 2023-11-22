import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateKeywordDto, DeleteKeywordDto } from './dtos';
import { KeywordService } from './keyword.service';

@Controller('keywords')
export class KeywordController {
  constructor(private keywordService: KeywordService) {}

  @Post()
  async createKeyword(@Body() data: CreateKeywordDto) {
    return await this.keywordService.createKeyword(data);
  }

  @Delete(':keywordId')
  async deleteKeyword(@Param() data: DeleteKeywordDto) {
    return await this.keywordService.deleteKeyword(data);
  }
}
