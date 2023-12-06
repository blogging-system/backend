import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { DocumentIdType, ResultMessage } from '@src/shared/contracts/types'
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
  public updateKeyword(
    @Param('keywordId') keywordId: DocumentIdType,
    @Body() data: CreateKeywordDto,
  ): Promise<Keyword> {
    return this.keywordService.updateKeyword(keywordId, data)
  }

  @Delete(':keywordId')
  @HttpCode(HttpStatus.OK)
  public deleteKeyword(@Param('keywordId') keywordId: DocumentIdType): Promise<ResultMessage> {
    return this.keywordService.deleteKeyword(keywordId)
  }

  @Get('/count')
  public getAllKeywordsCount(): Promise<ResultMessage> {
    return this.keywordService.getAllKeywordsCount()
  }
}
