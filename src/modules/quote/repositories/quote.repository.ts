import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ResultMessage } from 'src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { CreateQuoteDto } from '../dtos'
import { Model, Types } from 'mongoose'
import { MESSAGES } from '../constants'
import { Quote } from '../schemas'

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
    const isQuoteDeleted = await this.quoteModel.deleteOne({
      _id: new Types.ObjectId(quoteId),
    })

    if (isQuoteDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  async findOneById(quoteId: string): Promise<Quote> {
    const isQuoteFound = await this.quoteModel.findOne({ _id: new Types.ObjectId(quoteId) }).lean()

    if (!isQuoteFound) throw new NotFoundException(MESSAGES.QUOTE_NOT_FOUND)

    return isQuoteFound
  }

  async findOne(query: any): Promise<Quote> {
    return await this.quoteModel.findOne(query).lean()
  }
}
