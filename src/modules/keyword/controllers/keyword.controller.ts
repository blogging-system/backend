import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { CreateKeywordDto, DeleteKeywordDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { KeywordService } from '../services'
import { Keyword } from '../schemas'

@Controller('keywords')
export class KeywordController {
  constructor(private keywordService: KeywordService) {}

  @Post()
  async createKeyword(@Body() data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordService.createKeyword(data)
  }

  @Delete(':keywordId')
  async deleteKeyword(@Param() data: DeleteKeywordDto): Promise<ResultMessage> {
    return await this.keywordService.deleteKeyword(data)
  }
}
