import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { ResultMessage } from 'src/shared/types'
import { KeywordService } from '../services'
import { CreateKeywordDto } from '../dtos'
import { Keyword } from '../schemas'

@Controller('/admin/keywords')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateKeywordController {
  constructor(private keywordService: KeywordService) {}

  @Post()
  async createKeyword(@Body() data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordService.createKeyword(data)
  }

  @Patch(':keywordId')
  async updateKeyword(@Param('keywordId') keywordId: string, @Body() data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordService.updateKeyword(keywordId, data)
  }

  @Delete(':keywordId')
  async deleteKeyword(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
    return await this.keywordService.deleteKeyword(keywordId)
  }

  @Get('/count')
  async getAllKeywordsCount(): Promise<ResultMessage> {
    return await this.keywordService.getAllKeywordsCount()
  }
}
