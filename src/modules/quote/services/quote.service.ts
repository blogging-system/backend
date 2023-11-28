import { Injectable } from '@nestjs/common'
import { QuoteRepository } from '../repositories'
import { CreateQuoteDto } from '../dtos'
import { Quote } from '../schemas'

@Injectable()
export class QuoteService {
  constructor(private readonly quoteRepo: QuoteRepository) {}

  async createQuote(data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteRepo.createOne(data)
  }
}
