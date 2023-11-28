import { Controller, Get } from '@nestjs/common'
import { KeywordService } from '../services'
import { Keyword } from '../schemas'

@Controller('keywords')
export class PublicKeywordController {
  constructor(private keywordService: KeywordService) {}

  @Get()
  public async getAllKeywords(): Promise<Keyword[]> {
    return await this.keywordService.getAllKeywords()
  }
}
