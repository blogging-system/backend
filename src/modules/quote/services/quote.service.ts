import { Injectable } from '@nestjs/common'
import { QuoteRepository } from '../repositories'
import { CreateQuoteDto } from '../dtos'
import { Quote } from '../schemas'
import { Types } from 'mongoose'
import { ResultMessage } from 'src/shared/types'
import { Pagination } from 'src/shared/dtos'

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

  async deleteQuote(quoteId: string): Promise<ResultMessage> {
    await this.isQuoteAvailable(quoteId)

    return await this.quoteRepo.deleteOne(quoteId)
  }

  async getAllQuotes(pagination: Pagination): Promise<Quote[]> {
    return await this.quoteRepo.findMany(pagination)
  }

  private async isQuoteAvailable(quoteId: string): Promise<Quote> {
    return await this.quoteRepo.findOneById(quoteId)
  }
}
