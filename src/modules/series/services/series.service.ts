import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto } from '../dtos'
import { SeriesRepository } from '../repositories'
import { ResultMessage } from 'src/shared/types'
import { Pagination } from 'src/shared/dtos'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepo: SeriesRepository) {}

  async createSeries(data: CreateSeriesDto): Promise<Series> {
    return await this.seriesRepo.createOne(data)
  }

  async updateSeries(seriesId: string, payload: CreateSeriesDto): Promise<Series> {
    await this.seriesRepo.findOneById(seriesId)

    return await this.seriesRepo.updateOne(seriesId, payload)
  }

  async deleteSeries(data: DeleteSeriesDto): Promise<ResultMessage> {
    const isSeriesAvailable = await this.isSeriesAvailable(data.seriesId)

    if (!isSeriesAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)

    return await this.seriesRepo.deleteOne(data)
  }

  async publishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.seriesRepo.findOneById(seriesId)

    await this.seriesRepo.updateOne(seriesId, {
      ...isSeriesFound,
      isPublished: true,
      isPublishedAt: new Date(Date.now()),
    })

    return { message: MESSAGES.PUBLISHED_SUCCESSFULLY }
  }

  async unPublishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.seriesRepo.findOneById(seriesId)

    await this.seriesRepo.updateOne(seriesId, {
      ...isSeriesFound,
      isPublished: false,
      isUnPublishedAt: new Date(Date.now()),
    })

    return { message: MESSAGES.UNPUBLISHED_SUCCESSFULLY }
  }

  async getSeriesBySlug(slug: string): Promise<Series> {
    const isSeriesFound = await this.seriesRepo.findOne({ slug })

    if (!isSeriesFound) throw new NotFoundException(MESSAGES.SERIES_NOT_FOUND)

    return isSeriesFound
  }

  async getAllSeries(pagination: Partial<Pagination>): Promise<Series[]> {
    return await this.seriesRepo.findMany(pagination)
  }

  private async isSeriesAvailable(seriesId: string): Promise<boolean> {
    const isSeriesFound = await this.seriesRepo.findOne({ _id: seriesId })

    return !!isSeriesFound
  }

  async areSeriesAvailable(seriesIds: string[]): Promise<void> {
    const array = await Promise.all(seriesIds.map((id) => this.isSeriesAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }
}
