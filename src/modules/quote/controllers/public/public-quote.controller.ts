import { Controller, Get } from '@nestjs/common'
import { QuoteService } from '../../services'

@Controller('quotes')
export class PublicQuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('random')
  public async getRandomQuotes() {
    return await this.quoteService.getRandomQuotes()
  }
}
