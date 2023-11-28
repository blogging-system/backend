import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, GetSeriesBySlug } from '../dtos'
import { SortFieldOptions, SortValueOptions } from 'src/shared/enums'
import { PostService } from 'src/modules/post/services'
import { SeriesRepository } from '../repositories'
import { ResultMessage } from 'src/shared/types'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'

@Injectable()
export class SeriesService {
  constructor(
    private readonly seriesRepo: SeriesRepository,
    @Inject(forwardRef(() => PostService)) private readonly postService: PostService,
  ) {}

  public async createSeries(data: CreateSeriesDto): Promise<Series> {
    return await this.seriesRepo.createOne(data)
  }

  public async updateSeries(seriesId: string, payload: CreateSeriesDto): Promise<Series> {
    await this.isSeriesAvailable(seriesId)

    return await this.seriesRepo.updateOne(seriesId, payload)
  }

  public async deleteSeries(data: DeleteSeriesDto): Promise<ResultMessage> {
    await this.isSeriesAvailable(data.seriesId)
    await this.isSeriesAssociatedToPosts(data.seriesId)

    return await this.seriesRepo.deleteOne(data)
  }

  public async publishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.isSeriesAvailable(seriesId)

    if (isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED)

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: true,
      publishedAt: new Date(),
    })

    return { message: MESSAGES.PUBLISHED_SUCCESSFULLY }
  }

  public async unPublishSeries(seriesId: string): Promise<ResultMessage> {
    const isSeriesFound = await this.isSeriesAvailable(seriesId)

    if (!isSeriesFound.isPublished) throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED)

    await this.seriesRepo.updateOne(seriesId, {
      isPublished: false,
      unPublishedAt: new Date(),
    })

    return { message: MESSAGES.UNPUBLISHED_SUCCESSFULLY }
  }

  public async isSeriesAssociatedToPosts(seriesId: string): Promise<void> {
    const isSeriesAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ seriesId })

    if (isSeriesAssociated) throw new BadRequestException(MESSAGES.SERIES_ASSOCIATED_TO_POST)
  }

  private async isSeriesAvailable(seriesId: string): Promise<Series> {
    return await this.seriesRepo.findOneById(seriesId)
  }

  public async areSeriesAvailable(seriesIds: string[]): Promise<void> {
    const array = await Promise.all(seriesIds.map((id) => this.isSeriesAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }

  public async getSeriesBySlug({ slug, isPublished }: GetSeriesBySlug): Promise<Series> {
    const query: GetSeriesBySlug = {
      slug,
    }

    if (isPublished) query.isPublished = isPublished

    const isSeriesFound = await this.seriesRepo.findOne(query)

    await this.seriesRepo.updateOne(isSeriesFound._id, { views: isSeriesFound.views + 1 })

    if (!isSeriesFound) throw new NotFoundException(MESSAGES.SERIES_NOT_FOUND)

    return Object.assign(isSeriesFound, { views: isSeriesFound.views + 1 })
  }

  public async getAllSeries({ pagination, isPublished, sortValue }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished,
      sortCondition: sortValue == 1 ? `${SortFieldOptions.PUBLISHED_AT}` : `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  public async getLatestSeries({ pagination, isPublished }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished,
      sortCondition: `-${SortFieldOptions.CREATED_AT}`,
    })
  }

  public async getPublishedSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished: true,
      sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  public async getUnPublishedSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      isPublished: false,
      sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  public async getPopularSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      sortCondition: `-${SortFieldOptions.VIEWS}`,
    })
  }

  public async getUnPopularSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      sortCondition: `+${SortFieldOptions.VIEWS}`,
    })
  }

  public async getTrendingSeries({ pagination }: GetAllSeriesDto): Promise<Series[]> {
    return await this.seriesRepo.findMany({
      pagination,
      sortCondition: { [SortFieldOptions.PUBLISHED_AT]: SortValueOptions.DESC, views: SortValueOptions.DESC },
    })
  }

  //===============================
  public async getAllSeriesCount() {
    return await this.seriesRepo.countDocuments({})
  }

  public async getAllPublishedSeriesCount() {
    return await this.seriesRepo.countDocuments({ isPublished: true })
  }

  public async getAllUnPublishedSeriesCount() {
    return await this.seriesRepo.countDocuments({ isPublished: false })
  }
}
