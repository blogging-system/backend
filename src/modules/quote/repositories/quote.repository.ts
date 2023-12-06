import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DocumentIdType, ResultMessage } from '@src/shared/contracts/types'
import { InjectModel } from '@nestjs/mongoose'
import { Pagination } from '@src/shared/contracts/dtos'
import { CreateQuoteDto } from '../dtos'
import { Model, Types } from 'mongoose'
import { MESSAGES } from '../constants'
import { Quote } from '../schemas'

@Injectable()
export class QuoteRepository {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<Quote>) {}

  public async createOne(data: CreateQuoteDto): Promise<Quote> {
    const isQuoteCreated = await this.quoteModel.create(data)

    if (!isQuoteCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isQuoteCreated
  }

  public async updateOne(quoteId: DocumentIdType, payload: CreateQuoteDto): Promise<Quote> {
    const isQuoteUpdated = await this.quoteModel.findByIdAndUpdate(quoteId, payload, { new: true })

    if (!isQuoteUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isQuoteUpdated
  }

  public async deleteOne(quoteId: DocumentIdType): Promise<ResultMessage> {
    const isQuoteDeleted = await this.quoteModel.deleteOne({
      _id: new Types.ObjectId(quoteId),
    })

    if (isQuoteDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async findOneById(quoteId: DocumentIdType): Promise<Quote> {
    const isQuoteFound = await this.quoteModel.findOne({ _id: new Types.ObjectId(quoteId) }).lean()

    if (!isQuoteFound) throw new NotFoundException(MESSAGES.QUOTE_NOT_FOUND)

    return isQuoteFound
  }

  public async findMany({ pageNumber, pageSize, sort }: Pagination): Promise<Quote[]> {
    const areQuotesFound = await this.quoteModel
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort(sort == 1 ? 'createdAt' : '-createdAt')
      .lean()

    if (areQuotesFound.length === 0) throw new NotFoundException(MESSAGES.QUOTES_NOT_FOUND)

    return areQuotesFound
  }

  public async aggregate(): Promise<Quote[]> {
    const areQuotesFound = await this.quoteModel.aggregate([{ $sample: { size: 10 } }])

    if (areQuotesFound.length == 0) throw new NotFoundException(MESSAGES.QUOTES_NOT_FOUND)

    return areQuotesFound
  }

  public async countDocuments(): Promise<ResultMessage> {
    const count = await this.quoteModel.countDocuments().lean()

    return { count }
  }
}
