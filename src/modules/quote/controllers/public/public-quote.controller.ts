import { Controller, Get } from '@nestjs/common'
import { QuoteService } from '../../services'
import { Quote } from '../../schemas'

@Controller('quotes')
export class PublicQuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get('random')
  public getRandomQuotes(): Promise<Quote[]> {
    return this.quoteService.getRandomQuotes()
  }
}
