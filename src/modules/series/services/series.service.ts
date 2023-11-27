import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, GetSeriesBySlug } from '../dtos'
import { PostService } from 'src/modules/post/services'
import { SeriesRepository } from '../repositories'
import { ResultMessage } from 'src/shared/types'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'
import { SortFieldOptions } from 'src/shared/enums'

@Injectable()
export class SeriesService {
  constructor(
    private readonly seriesRepo: SeriesRepository,
    @Inject(forwardRef(() => PostService)) private readonly postService: PostService,
  ) {}

  async createSeries(data: CreateSeriesDto): Promise<Series> {
    return await this.seriesRepo.createOne(data)
  }

  async updateSeries(seriesId: string, payload: CreateSeriesDto): Promise<Series> {
    await this.isSeriesAvailable(seriesId)

    return await this.seriesRepo.updateOne(seriesId, payload)
  }

  async deleteSeries(data: DeleteSeriesDto): Promise<ResultMessage> {
    await this.isSeriesAvailable(data.seriesId)
    await this.isSeriesAssociatedToPosts(data.seriesId)

    return await this.seriesRepo.deleteOne(data)
  }

  async publishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.isSeriesAvailable(seriesId)

    if (isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED)

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: true,
      publishedAt: new Date(Date.now()),
    })

    return { message: MESSAGES.PUBLISHED_SUCCESSFULLY }
  }

  async unPublishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.isSeriesAvailable(seriesId)

    if (!isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED)

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: false,
      unPublishedAt: new Date(Date.now()),
    })

    return { message: MESSAGES.UNPUBLISHED_SUCCESSFULLY }
  }

  async isSeriesAssociatedToPosts(seriesId: string): Promise<void> {
    const isSeriesAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ seriesId })

    if (isSeriesAssociated) throw new BadRequestException(MESSAGES.SERIES_ASSOCIATED_TO_POST)
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

  async getAllSeries({ pagination, isPublished, sortValue }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished,
      sortCondition: sortValue == 1 ? `${SortFieldOptions.PUBLISHED_AT}` : `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  async getLatestSeries({ pagination, isPublished }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished,
      sortCondition: `-${SortFieldOptions.CREATED_AT}`,
    })
  }

  async getPublishedSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished: true,
      sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  async getUnPublishedSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished: false,
      sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  //===============================
  async getAllSeriesCount() {
    return await this.seriesRepo.countDocuments({})
  }

  async getAllPublishedSeriesCount() {
    return await this.seriesRepo.countDocuments({ isPublished: true })
  }

  async getAllUnPublishedSeriesCount() {
    return await this.seriesRepo.countDocuments({ isPublished: false })
  }
}
