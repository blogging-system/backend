import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { DocumentIdType, ResultMessage } from '@src/shared/data/types'
import { QuoteService } from '../../services'
import { Pagination } from '@src/shared/data/dtos'
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
  public updateQuote(@Param('quoteId') quoteId: DocumentIdType, @Body() data: CreateQuoteDto): Promise<Quote> {
    return this.quoteService.updateQuote(quoteId, data)
  }

  @Delete(':quoteId')
  public deleteQuote(@Param('quoteId') quoteId: DocumentIdType): Promise<ResultMessage> {
    return this.quoteService.deleteQuote(quoteId)
  }

  @Get()
  public async GetAllQuotes(@Query() pagination: Pagination): Promise<Quote[]> {
    return this.quoteService.getAllQuotes(pagination)
  }
}
