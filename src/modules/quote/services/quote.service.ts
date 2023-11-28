import { ResultMessage } from 'src/shared/types'
import { QuoteRepository } from '../repositories'
import { Pagination } from 'src/shared/dtos'
import { Injectable } from '@nestjs/common'
import { CreateQuoteDto } from '../dtos'
import { Quote } from '../schemas'

@Injectable()
export class QuoteService {
  constructor(private readonly quoteRepo: QuoteRepository) {}

  public async createQuote(data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteRepo.createOne(data)
  }

  public async updateQuote(quoteId: string, payload: CreateQuoteDto): Promise<Quote> {
    await this.getQuote(quoteId)

    return await this.quoteRepo.updateOne(quoteId, payload)
  }

  public async deleteQuote(quoteId: string): Promise<ResultMessage> {
    await this.getQuote(quoteId)

    return await this.quoteRepo.deleteOne(quoteId)
  }

  private async getQuote(quoteId: string): Promise<Quote> {
    return await this.quoteRepo.findOneById(quoteId)
  }

  public async getAllQuotes(pagination: Pagination): Promise<Quote[]> {
    return await this.quoteRepo.findMany(pagination)
  }

  public async getRandomQuotes(): Promise<Quote[]> {
    return await this.quoteRepo.aggregate()
  }
}
