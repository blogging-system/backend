import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import {
  CreatePostDto,
  DeletePostDto,
  GetPostBySlug,
  GetAllPostsDto,
  ArePostsAvailableForGivenEntitiesIdsDto,
  ArePostsAvailableForGivenEntitiesIdsQuery,
} from '../dtos'
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
    private readonly tagService: TagService,
    private readonly seriesService: SeriesService,
    private readonly keywordService: KeywordService,
  ) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    await this.tagService.areTagsAvailable(data.tags)
    await this.keywordService.areKeywordsAvailable(data.keywords)
    await this.seriesService.areSeriesAvailable(data.series)

    return await this.postRepo.createOne(data)
  }

  async updatePost(postId: string, payload: CreatePostDto): Promise<Post> {
    await this.isPostAvailable(postId)

    await this.tagService.areTagsAvailable(payload.tags)
    await this.keywordService.areKeywordsAvailable(payload.keywords)
    await this.seriesService.areSeriesAvailable(payload.series)

    return await this.postRepo.updateOne(postId, payload)
  }

  async deletePost(data: DeletePostDto): Promise<ResultMessage> {
    await this.isPostAvailable(data.postId)

    return await this.postRepo.deleteOne(data)
  }

  async publishPost(postId: string): Promise<Post> {
    const foundPost = await this.isPostAvailable(postId)

    if (foundPost.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED)

    return await this.postRepo.updateOne(postId, {
      isPublished: true,
      isPublishedAt: new Date(Date.now()),
    })
  }

  async unPublishPost(postId: string): Promise<Post> {
    const foundPost = await this.isPostAvailable(postId)

    if (!foundPost.isPublished) throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED)

    return await this.postRepo.updateOne(postId, {
      isPublished: false,
      isUnPublishedAt: new Date(Date.now()),
    })
  }

  async arePostsAvailableForGivenEntitiesIds({
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

  async getPostBySlug({ slug, isPublished }: GetPostBySlug): Promise<Post> {
    const query: GetPostBySlug = {
      slug,
    }

    if (isPublished) query.isPublished = isPublished

    const isPostFound = await this.postRepo.findOne(query)

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND)

    return isPostFound
  }

  async isPostAvailable(postId: string): Promise<Post> {
    return await this.postRepo.findOneById(postId)
  }

  async getAllPosts({ filter, pagination, isPublished }: GetAllPostsDto): Promise<Post[]> {
    return await this.postRepo.findMany({ filter, pagination, isPublished })
  }

  //==========================
  async getAllPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({})
  }

  async getAllPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true })
  }

  async getAllUnPublishedPostsCount(): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false })
  }

  //==========================
  async getAllPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ tagId })
  }

  async getAllPublishedPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true, tagId })
  }

  async getAllUnPublishedPostsCountWithGivenTagId(tagId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false, tagId })
  }

  //==========================
  async getAllPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ keywordId })
  }

  async getAllPublishedPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: true, keywordId })
  }

  async getAllUnPublishedPostsCountWithGivenKeywordId(keywordId: string): Promise<ResultMessage> {
    return await this.postRepo.countDocuments({ isPublished: false, keywordId })
  }
}
