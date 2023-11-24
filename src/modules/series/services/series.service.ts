import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto } from '../dtos'
import { SeriesRepository } from '../repositories'
import { DeleteSeriesResponse } from '../types'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepo: SeriesRepository) {}

  async createSeries(data: CreateSeriesDto): Promise<Series> {
    return await this.seriesRepo.createOne(data)
  }

  async deleteSeries(data: DeleteSeriesDto): Promise<DeleteSeriesResponse> {
    const isSeriesAvailable = await this.isSeriesAvailable(data.seriesId)

    if (!isSeriesAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)

    return await this.seriesRepo.deleteOne(data)
  }

  async isSeriesAvailable(seriesId: string): Promise<boolean> {
    const isSeriesFound = await this.seriesRepo.findOne({ _id: seriesId })

    return !!isSeriesFound
  }

  async areSeriesAvailable(seriesIds: string[]): Promise<void> {
    const array = await Promise.all(seriesIds.map((id) => this.isSeriesAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }
}
