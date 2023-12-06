import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/infrastructure/interceptors'
import { ResultMessage } from '@src/shared/types'
import { QuoteService } from '../../services'
import { Pagination } from '@src/shared/dtos'
import { CreateQuoteDto } from '../../dtos'
import { Quote } from '../../schemas'

@Controller('/admin/quotes')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateQuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  public createQuote(@Body() data: CreateQuoteDto): Promise<Quote> {
    return this.quoteService.createQuote(data)
  }

  @Patch(':quoteId')
  public updateQuote(@Param('quoteId') quoteId: string, @Body() data: CreateQuoteDto): Promise<Quote> {
    return this.quoteService.updateQuote(quoteId, data)
  }

  @Delete(':quoteId')
  public deleteQuote(@Param('quoteId') quoteId: string): Promise<ResultMessage> {
    return this.quoteService.deleteQuote(quoteId)
  }

  @Get()
  public async GetAllQuotes(@Query() pagination: Pagination): Promise<Quote[]> {
    return this.quoteService.getAllQuotes(pagination)
  }
}
