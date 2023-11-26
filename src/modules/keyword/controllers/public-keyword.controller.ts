import { Controller } from '@nestjs/common'
import { KeywordService } from '../services'

@Controller('keywords')
export class PublicKeywordController {
  constructor(private keywordService: KeywordService) {}
}
