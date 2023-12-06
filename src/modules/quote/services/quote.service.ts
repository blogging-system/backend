import { DocumentIdType, ResultMessage } from '@src/shared/contracts/types'
import { Pagination } from '@src/shared/contracts/dtos'
import { QuoteRepository } from '../repositories'
import { Injectable } from '@nestjs/common'
import { CreateQuoteDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Quote } from '../schemas'

@Injectable()
export class QuoteService {
  constructor(private readonly quoteRepo: QuoteRepository) {}

  public async createQuote(data: CreateQuoteDto): Promise<Quote> {
    return await this.quoteRepo.createOne(data)
  }

  public async updateQuote(quoteId: DocumentIdType, payload: CreateQuoteDto): Promise<Quote> {
    return await this.quoteRepo.updateOne(quoteId, payload)
  }

  public async deleteQuote(quoteId: DocumentIdType): Promise<ResultMessage> {
    await this.quoteRepo.deleteOne(quoteId)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async getAllQuotes({ pageSize, pageNumber, sort }: Pagination): Promise<Quote[]> {
    const options = {
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
      sort: { createdAt: sort === 1 ? 1 : -1 },
    }

    return await this.quoteRepo.find({}, options)
  }

  public async getRandomQuotes(): Promise<Quote[]> {
    return await this.quoteRepo.aggregate([{ $sample: { size: 10 } }])
  }
}
