import { Injectable, BadRequestException, NotFoundException, Inject, forwardRef } from '@nestjs/common'
import { SortOptions } from '@src/shared/contracts/enums'
import { KeywordService } from '../../keyword/services'
import { CreatePostDto, DeletePostDto } from '../dtos'
import { SeriesService } from '../../series/services'
import { DocumentIdType, ResultMessage } from '@src/shared/contracts/types'
import { PostRepository } from '../repositories'
import { TagService } from '../../tag/services'
import { GetAllPostsDto, GetAllPostsQuery } from '../interfaces'
import { MESSAGES } from '../constants'
import { Post } from '../schemas'
import {
  GetPostBySlug,
  ArePostsAvailableForGivenEntitiesIds,
  ArePostsAvailableForGivenEntitiesIdsQuery,
} from '../interfaces'
import slugify from 'slugify'

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

    return await this.postRepo.createOne({ ...data, slug: slugify(data.title, { lower: true }) })
  }

  public async updatePost(postId: DocumentIdType, payload: CreatePostDto): Promise<Post> {
    await this.isPostAvailable(postId)

    await this.tagService.areTagsAvailable(payload.tags)
    await this.keywordService.areKeywordsAvailable(payload.keywords)
    await this.seriesService.areSeriesAvailable(payload.series)

    return await this.postRepo.updateOne(postId, { ...payload, slug: slugify(payload.title, { lower: true }) })
  }

  public async deletePost(data: DeletePostDto): Promise<ResultMessage> {
    await this.isPostAvailable(data.postId)

    await this.postRepo.deleteOne(data)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async publishPost(postId: DocumentIdType): Promise<Post> {
    const foundPost = await this.postRepo.findOne({ _id: postId })

    if (foundPost.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED)

    return await this.postRepo.updateOne(postId, {
      isPublished: true,
      publishedAt: new Date(),
    })
  }

  public async unPublishPost(postId: DocumentIdType): Promise<Post> {
    const foundPost = await this.postRepo.findOne({ _id: postId })

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
  }: ArePostsAvailableForGivenEntitiesIds): Promise<boolean> {
    const query: ArePostsAvailableForGivenEntitiesIdsQuery = {}

    if (tagId) query.tags = tagId.toString()
    if (keywordId) query.keywords = keywordId.toString()
    if (seriesId) query.series = seriesId.toString()

    const isPostFound = await this.postRepo.findOne(query)

    return !!isPostFound
  }

  public async getPostBySlug({ slug, isPublished }: GetPostBySlug): Promise<Post> {
    const query: GetPostBySlug = {
      slug,
    }

    if (isPublished) query.isPublished = isPublished

    const isPostFound = await this.postRepo.findOne(query)

    await this.postRepo.updateOne(isPostFound._id, { views: isPostFound.views + 1 })

    return Object.assign(isPostFound, { views: isPostFound.views + 1 })
  }

  public async isPostAvailable(postId: DocumentIdType): Promise<boolean> {
    return await this.postRepo.isFound({ _id: postId })
  }

  public async getAllPosts({
    pagination: { pageSize, pageNumber, sort },
    isPublished,
    seriesId,
    tagId,
  }: GetAllPostsDto): Promise<Post[]> {
    const query: GetAllPostsQuery = {}

    if (isPublished) query.isPublished = isPublished
    if (seriesId) query.series = seriesId
    if (tagId) query.tags = tagId

    return await this.postRepo.find(query, {
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
      sort: { [SortOptions.CREATED_AT]: sort == 1 ? SortOptions.ASC : SortOptions.DESC },
    })
  }

  public async getLatestPosts({ pagination: { pageSize, pageNumber } }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.find(
      {
        isPublished: false,
      },
      {
        sort: { [SortOptions.CREATED_AT]: -1, [SortOptions.UPDATED_AT]: -1 },
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
      },
    )
  }

  public async getPublishedPosts({ pagination: { pageSize, pageNumber } }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.find(
      {
        isPublished: true,
      },
      {
        sort: { [SortOptions.PUBLISHED_AT]: -1, [SortOptions.UPDATED_AT]: -1 },
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
      },
    )
  }

  public async getUnPublishedPosts({ pagination: { pageNumber, pageSize } }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.find(
      {
        isPublished: false,
      },
      {
        sort: { [SortOptions.PUBLISHED_AT]: -1, [SortOptions.UPDATED_AT]: -1 },
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
      },
    )
  }

  public async getPopularPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.find({
      pagination,
      sortCondition: `-${SortOptions.VIEWS}`,
    })
  }

  public async getUnPopularPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.find({
      pagination,
      sortCondition: `+${SortOptions.VIEWS}`,
    })
  }

  public async getTrendingPosts({ pagination }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.find({
      pagination,
      sortCondition: { [SortOptions.PUBLISHED_AT]: SortOptions.DESC, views: SortOptions.DESC },
    })
  }

  public async getAllPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({})
  }

  public async getAllPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true })
  }

  public async getAllUnPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false })
  }

  public async getAllPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ tagId })
  }

  public async getAllPublishedPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true, tagId })
  }

  public async getAllUnPublishedPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false, tagId })
  }

  public async getAllPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ keywordId })
  }

  public async getAllPublishedPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true, keywordId })
  }

  public async getAllUnPublishedPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false, keywordId })
  }

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
