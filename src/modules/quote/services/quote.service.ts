import { Injectable } from '@nestjs/common'
import { QuoteRepository } from '../repositories'
import { CreateQuoteDto } from '../dtos'
import { Quote } from '../schemas'
import { Types } from 'mongoose'

@Injectable()
export class QuoteService {
  constructor(private readonly quoteRepo: QuoteRepository) {}

  async createQuote(data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteRepo.createOne(data)
  }

  async updateQuote(quoteId: string, payload: CreateQuoteDto): Promise<Quote> {
    await this.isQuoteAvailable(quoteId)

    return await this.quoteRepo.updateOne(quoteId, payload)
  }

  private async isQuoteAvailable(quoteId: string): Promise<Quote> {
    return await this.quoteRepo.findOneById(quoteId)
  }
}
