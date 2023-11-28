import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, SeriesManipulationDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'
import { Model } from 'mongoose'
import slugify from 'slugify'
import { Pagination } from 'src/shared/dtos'
import { CountDocumentsDto, CountDocumentsQuery } from 'src/shared/dtos/count-document.dto'

@Injectable()
export class SeriesRepository {
  constructor(@InjectModel(Series.name) private seriesModel: Model<Series>) {}

  public async createOne(data: CreateSeriesDto): Promise<Series> {
    const isSeriesCreated = await this.seriesModel.create({ ...data, slug: slugify(data.title) })

    if (!isSeriesCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isSeriesCreated
  }

  public async updateOne(seriesId: string, payload: Partial<SeriesManipulationDto>): Promise<Series> {
    const query: Partial<SeriesManipulationDto> = { ...payload }

    if (payload.title) query.slug = slugify(payload.title)

    const isSeriesUpdated = await this.seriesModel.findByIdAndUpdate(seriesId, query, { new: true })

    if (!isSeriesUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isSeriesUpdated
  }

  public async deleteOne(data: DeleteSeriesDto): Promise<ResultMessage> {
    const isSeriesDeleted = await this.seriesModel.deleteOne({
      _id: data.seriesId,
    })

    if (isSeriesDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async findOneById(seriesId: string): Promise<Series> {
    const isSeriesFound = await this.seriesModel.findOne({ _id: seriesId }).lean()

    if (!isSeriesFound) throw new NotFoundException(MESSAGES.SERIES_NOT_FOUND)

    return isSeriesFound
  }

  public async findOne(query: any): Promise<Series> {
    return await this.seriesModel.findOne(query).lean()
  }

  public async findMany({ pagination, isPublished, sortCondition }: GetAllSeriesDto) {
    const { pageNumber, pageSize } = pagination
    const query: { isPublished?: boolean } = {}

    if (isPublished) query.isPublished = isPublished
    if (isPublished !== undefined) query.isPublished = isPublished

    const foundSeries = await this.seriesModel
      .find(query)
      .skip((pageNumber - 1) * Number(pageSize))
      .limit(pageSize)
      .sort(sortCondition)
      .lean()

    if (foundSeries.length === 0) throw new NotFoundException(MESSAGES.SERIES_ARE_NOT_FOUND)

    return foundSeries
  }

  public async countDocuments({ isPublished }: CountDocumentsDto): Promise<ResultMessage> {
    const query: CountDocumentsQuery = {}

    if (isPublished) query.isPublished = isPublished
    if (isPublished !== undefined) query.isPublished = isPublished

    const count = await this.seriesModel.countDocuments(query).lean()

    return { count }
  }
}
