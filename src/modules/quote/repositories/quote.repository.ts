import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CreateQuoteDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Quote } from '../schemas'
import { Model, Types } from 'mongoose'
import { ResultMessage } from 'src/shared/types'

@Injectable()
export class QuoteRepository {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<Quote>) {}

  async createOne(data: CreateQuoteDto): Promise<Quote> {
    const isQuoteCreated = await this.quoteModel.create(data)

    if (!isQuoteCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isQuoteCreated
  }

  async updateOne(quoteId: string, payload: CreateQuoteDto): Promise<Quote> {
    const isQuoteUpdated = await this.quoteModel.findByIdAndUpdate(quoteId, payload, { new: true })

    if (!isQuoteUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isQuoteUpdated
  }

  async deleteOne(quoteId: string): Promise<ResultMessage> {
    const isKeywordDeleted = await this.quoteModel.deleteOne({
      _id: new Types.ObjectId(quoteId),
    })

    if (isKeywordDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }
}
