import { Body, Controller, Delete, Param, Post, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { CreateKeywordDto, DeleteKeywordDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { KeywordService } from '../services'
import { Keyword } from '../schemas'

@Controller('/admin/keywords')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateKeywordController {
  constructor(private keywordService: KeywordService) {}

  @Post()
  async createKeyword(@Body() data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordService.createKeyword(data)
  }

  @Delete(':keywordId')
  async deleteKeyword(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
    return await this.keywordService.deleteKeyword(keywordId)
  }
}
