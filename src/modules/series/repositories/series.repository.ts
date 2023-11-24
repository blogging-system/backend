import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto } from '../dtos'
import { DeleteSeriesResponse } from '../types'
import { InjectModel } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'
import { Model } from 'mongoose'

@Injectable()
export class SeriesRepository {
  constructor(@InjectModel(Series.name) private seriesModel: Model<Series>) {}

  async createOne(data: CreateSeriesDto): Promise<Series> {
    const isSeriesCreated = await this.seriesModel.create(data)

    if (!isSeriesCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isSeriesCreated
  }

  async deleteOne(data: DeleteSeriesDto): Promise<DeleteSeriesResponse> {
    const isSeriesDeleted = await this.seriesModel.deleteOne({
      _id: data.seriesId,
    })

    if (isSeriesDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  async findOneById(seriesId: string): Promise<Series> {
    const isSeriesFound = await this.seriesModel.findOne({ _id: seriesId }).lean()

    if (!isSeriesFound) throw new NotFoundException(MESSAGES.SERIES_NOT_FOUND)

    return isSeriesFound
  }

  async findOne(query: any): Promise<Series> {
    return await this.seriesModel.findOne(query).lean()
  }
}
