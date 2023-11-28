import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { ResultMessage } from 'src/shared/types'
import { KeywordService } from '../../services'
import { CreateKeywordDto } from '../../dtos'
import { Keyword } from '../../schemas'

@Controller('/admin/keywords')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateKeywordController {
  constructor(private keywordService: KeywordService) {}

  @Post()
  public createKeyword(@Body() data: CreateKeywordDto): Promise<Keyword> {
    return this.keywordService.createKeyword(data)
  }

  @Patch(':keywordId')
  public updateKeyword(@Param('keywordId') keywordId: string, @Body() data: CreateKeywordDto): Promise<Keyword> {
    return this.keywordService.updateKeyword(keywordId, data)
  }

  @Delete(':keywordId')
  public deleteKeyword(@Param('keywordId') keywordId: string): Promise<ResultMessage> {
    return this.keywordService.deleteKeyword(keywordId)
  }

  @Get('/count')
  public getAllKeywordsCount(): Promise<ResultMessage> {
    return this.keywordService.getAllKeywordsCount()
  }
}
