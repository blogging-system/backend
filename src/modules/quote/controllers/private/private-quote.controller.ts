import { Body, Controller, Post, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { QuoteService } from '../../services'
import { CreateQuoteDto } from '../../dtos'
import { Quote } from '../../schemas'

@Controller('/admin/quotes')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateQuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async createQuote(@Body() data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteService.createQuote(data)
  }
}
