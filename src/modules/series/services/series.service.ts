import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, GetSeriesBySlug } from '../dtos'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { SeriesRepository } from '../repositories'
import { ResultMessage } from 'src/shared/types'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepo: SeriesRepository) {}

  async createSeries(data: CreateSeriesDto): Promise<Series> {
    return await this.seriesRepo.createOne(data)
  }

  async updateSeries(seriesId: string, payload: CreateSeriesDto): Promise<Series> {
    await this.isSeriesAvailable(seriesId)

    return await this.seriesRepo.updateOne(seriesId, payload)
  }

  async deleteSeries(data: DeleteSeriesDto): Promise<ResultMessage> {
    await this.isSeriesAvailable(data.seriesId)
    // TODO: check if it's attached to any posts!
    return await this.seriesRepo.deleteOne(data)
  }

  async publishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.isSeriesAvailable(seriesId)

    if (isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED)

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: true,
      isPublishedAt: new Date(Date.now()),
    })

    return { message: MESSAGES.PUBLISHED_SUCCESSFULLY }
  }

  async unPublishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.isSeriesAvailable(seriesId)

    if (!isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED)

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: false,
      isUnPublishedAt: new Date(Date.now()),
    })

    return { message: MESSAGES.UNPUBLISHED_SUCCESSFULLY }
  }

  private async isSeriesAvailable(seriesId: string): Promise<Series> {
    return await this.seriesRepo.findOneById(seriesId)
  }

  async areSeriesAvailable(seriesIds: string[]): Promise<void> {
    const array = await Promise.all(seriesIds.map((id) => this.isSeriesAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }

  async getSeriesBySlug({ slug, isPublished }: GetSeriesBySlug): Promise<Series> {
    const query: GetSeriesBySlug = {
      slug,
    }

    if (isPublished) query.isPublished = isPublished

    const isSeriesFound = await this.seriesRepo.findOne(query)

    if (!isSeriesFound) throw new NotFoundException(MESSAGES.SERIES_NOT_FOUND)

    return isSeriesFound
  }

  async getAllSeries({ pagination, isPublished }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({ pagination, isPublished })
  }
}
