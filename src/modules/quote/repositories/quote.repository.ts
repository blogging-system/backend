import { BaseRepository } from '@src/shared/repository'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Quote } from '../schemas'
import { Model } from 'mongoose'

@Injectable()
export class QuoteRepository extends BaseRepository<Quote> {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<Quote>) {
    super(quoteModel)
  }
}
