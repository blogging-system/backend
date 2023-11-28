import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { QuoteService } from '../../services'
import { CreateQuoteDto } from '../../dtos'
import { Quote } from '../../schemas'
import { ResultMessage } from 'src/shared/types'
import { Pagination } from 'src/shared/dtos'

@Controller('/admin/quotes')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateQuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  public async createQuote(@Body() data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteService.createQuote(data)
  }

  @Patch(':quoteId')
  public async updateQuote(@Param('quoteId') quoteId: string, @Body() data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteService.updateQuote(quoteId, data)
  }

  @Delete(':quoteId')
  public async deleteQuote(@Param('quoteId') quoteId: string): Promise<ResultMessage> {
    return await this.quoteService.deleteQuote(quoteId)
  }

  @Get()
  public async GetAllQuotes(@Query() pagination: Pagination): Promise<Quote[]> {
    return await this.quoteService.getAllQuotes(pagination)
  }
}
