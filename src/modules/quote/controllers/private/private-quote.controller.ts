import { Body, Controller, Delete, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { QuoteService } from '../../services'
import { CreateQuoteDto } from '../../dtos'
import { Quote } from '../../schemas'
import { ResultMessage } from 'src/shared/types'

@Controller('/admin/quotes')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateQuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  async createQuote(@Body() data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteService.createQuote(data)
  }

  @Patch(':quoteId')
  async updateQuote(@Param('quoteId') quoteId: string, @Body() data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteService.updateQuote(quoteId, data)
  }

  @Delete(':quoteId')
  async deleteQuote(@Param('quoteId') quoteId: string): Promise<ResultMessage> {
    return await this.quoteService.deleteQuote(quoteId)
  }
}
