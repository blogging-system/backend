import {
  CreatePostDto,
  DeletePostDto,
  GetPostBySlug,
  GetAllPostsDto,
  ArePostsAvailableForGivenEntitiesIdsDto,
  ArePostsAvailableForGivenEntitiesIdsQuery,
} from '../dtos'
import { Injectable, BadRequestException, NotFoundException, Inject, forwardRef } from '@nestjs/common'
import { SortFieldOptions, SortValueOptions } from 'src/shared/enums'
import { KeywordService } from '../../keyword/services'
import { SeriesService } from '../../series/services'
import { ResultMessage } from 'src/shared/types'
import { PostRepository } from '../repositories'
import { TagService } from '../../tag/services'
import { MESSAGES } from '../constants'
import { Post } from '../schemas'

@Injectable()
export class PostService {
  constructor(
    private readonly postRepo: PostRepository,
    @Inject(forwardRef(() => TagService)) private readonly tagService: TagService,
    @Inject(forwardRef(() => SeriesService)) private readonly seriesService: SeriesService,
    @Inject(forwardRef(() => KeywordService)) private readonly keywordService: KeywordService,
  ) {}

  public async createPost(data: CreatePostDto): Promise<Post> {
    await this.tagService.areTagsAvailable(data.tags)
    await this.keywordService.areKeywordsAvailable(data.keywords)
    await this.seriesService.areSeriesAvailable(data.series)

    return await this.postRepo.createOne(data)
  }

  public async updatePost(postId: string, payload: CreatePostDto): Promise<Post> {
    await this.isPostAvailable(postId)

    await this.tagService.areTagsAvailable(payload.tags)
    await this.keywordService.areKeywordsAvailable(payload.keywords)
    await this.seriesService.areSeriesAvailable(payload.series)

    return await this.postRepo.updateOne(postId, payload)
  }

  public async deletePost(data: DeletePostDto): Promise<ResultMessage> {
    await this.isPostAvailable(data.postId)

    return await this.postRepo.deleteOne(data)
  }

  public async publishPost(postId: string): Promise<Post> {
    const foundPost = await this.isPostAvailable(postId)

    if (foundPost.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED)

    return await this.postRepo.updateOne(postId, {
      isPublished: true,
      publishedAt: new Date(),
    })
  }

  public async unPublishPost(postId: string): Promise<Post> {
    const foundPost = await this.isPostAvailable(postId)

    if (!foundPost.isPublished) throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED)

    return await this.postRepo.updateOne(postId, {
      isPublished: false,
      unPublishedAt: new Date(),
    })
  }

  public async arePostsAvailableForGivenEntitiesIds({
    tagId,
    keywordId,
    seriesId,
  }: ArePostsAvailableForGivenEntitiesIdsDto): Promise<boolean> {
    const query: ArePostsAvailableForGivenEntitiesIdsQuery = {}

    if (tagId) query.tags = tagId
    if (keywordId) query.keywords = keywordId
    if (seriesId) query.series = seriesId

    const isPostFound = await this.postRepo.findOne(query)

    return !!isPostFound
  }

  public async getPostBySlug({ slug, isPublished }: GetPostBySlug): Promise<Post> {
    const query: GetPostBySlug = {
      slug,
    }

    if (isPublished) query.isPublished = isPublished

    const isPostFound = await this.postRepo.findOne(query)

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND)

    await this.postRepo.updateOne(isPostFound._id, { views: isPostFound.views + 1 })

    return Object.assign(isPostFound, { views: isPostFound.views + 1 })
  }

  public async isPostAvailable(postId: string): Promise<Post> {
    return await this.postRepo.findOneById(postId)
  }

  public async getAllPosts({ filter, pagination, isPublished, sortValue }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({
      filter,
      pagination,
      isPublished,
      sortCondition: sortValue == 1 ? `${SortFieldOptions.PUBLISHED_AT}` : `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  public async getLatestPosts({ pagination, isPublished }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({
      pagination,
      isPublished,
      sortCondition: `-${SortFieldOptions.CREATED_AT}`,
    })
  }

  public async getPublishedPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({
      pagination,
      isPublished: true,
      sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  public async getUnPublishedPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({
      pagination,
      isPublished: false,
      sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
    })
  }

  public async getPopularPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({
      pagination,
      sortCondition: `-${SortFieldOptions.VIEWS}`,
    })
  }

  public async getUnPopularPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({
      pagination,
      sortCondition: `+${SortFieldOptions.VIEWS}`,
    })
  }

  public async getTrendingPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({
      pagination,
      sortCondition: { [SortFieldOptions.PUBLISHED_AT]: SortValueOptions.DESC, views: SortValueOptions.DESC },
    })
  }

  //==========================
  public async getAllPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({})
  }

  public async getAllPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true })
  }

  public async getAllUnPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false })
  }

  //==========================
  public async getAllPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ tagId })
  }

  public async getAllPublishedPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true, tagId })
  }

  public async getAllUnPublishedPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false, tagId })
  }

  //==========================
  public async getAllPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ keywordId })
  }

  public async getAllPublishedPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true, keywordId })
  }

  public async getAllUnPublishedPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false, keywordId })
  }

  //==========================
  public async getAllPostsCountWithGivenSeriesId(seriesId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ seriesId })
  }

  public async getAllPublishedPostsCountWithGivenSeriesId(seriesId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true, seriesId })
  }

  public async getAllUnPublishedPostsCountWithGivenSeriesId(seriesId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false, seriesId })
  }
}
