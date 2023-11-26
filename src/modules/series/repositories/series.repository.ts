import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, SeriesManipulationDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'
import { Model } from 'mongoose'
import slugify from 'slugify'
import { Pagination } from 'src/shared/dtos'

@Injectable()
export class SeriesRepository {
  constructor(@InjectModel(Series.name) private seriesModel: Model<Series>) {}

  async createOne(data: CreateSeriesDto): Promise<Series> {
    const isSeriesCreated = await this.seriesModel.create({ ...data, slug: slugify(data.title) })

    if (!isSeriesCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isSeriesCreated
  }

  async updateOne(seriesId: string, payload: Partial<SeriesManipulationDto>): Promise<Series> {
    const query: Partial<SeriesManipulationDto> = { ...payload }

    if (payload.title) query.slug = slugify(payload.title)

    const isSeriesUpdated = await this.seriesModel.findByIdAndUpdate(seriesId, query, { new: true })

    if (!isSeriesUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isSeriesUpdated
  }

  async deleteOne(data: DeleteSeriesDto): Promise<ResultMessage> {
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

  async findMany({ pagination: { pageNumber, pageSize, sort }, isPublished }: GetAllSeriesDto) {
    const query: { isPublished?: boolean } = {}

    if (isPublished) query.isPublished = isPublished

    const foundSeries = await this.seriesModel
      .find(query)
      .skip((pageNumber - 1) * Number(pageSize))
      .limit(pageSize)
      .sort(sort == 1 ? 'isPublishedAt' : '-isPublishedAt')
      .lean()

    if (foundSeries.length === 0) throw new NotFoundException(MESSAGES.SERIES_ARE_NOT_FOUND)

    return foundSeries
  }
}
