import { GetAllPosts, CreatePostDto, DeletePostDto } from '../dtos'
import { Injectable, BadRequestException } from '@nestjs/common'
import { KeywordService } from '../../keyword/services'
import { SeriesService } from '../../series/services'
import { ResultMessage } from 'src/shared/types'
import { PostRepository } from '../repositories'
import { TagService } from '../../tag/services'
import { Pagination } from 'src/shared/dtos'
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
    const foundPost = await this.postRepo.findOneById(postId)

    if (foundPost.isPublished) throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED)

    return await this.postRepo.updateOne(postId, {
      title: foundPost.title,
      isPublished: true,
      isPublishedAt: new Date(Date.now()),
    })
  }

  async unPublishPost(postId: string): Promise<Post> {
    const foundPost = await this.postRepo.findOneById(postId)

    if (!foundPost.isPublished) throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED)

    return await this.postRepo.updateOne(postId, {
      title: foundPost.title,
      isPublished: false,
      isPublishedAt: new Date(Date.now()),
    })
  }

  async getPostById(postId: string): Promise<Post> {
    return await this.postRepo.findOneById(postId)
  }

  async getPostBySlug(slug: string): Promise<Post> {
    return await this.postRepo.findOne({ slug })
  }

  async isPostAvailable(postId: string): Promise<Post> {
    const isPostAvailable = await this.postRepo.findOne({ _id: postId })

    if (!isPostAvailable) throw new BadRequestException(MESSAGES.POST_NOT_AVAILABLE)

    return isPostAvailable
  }

  async getAllPosts(filter: GetAllPosts, pagination: Pagination): Promise<Post[]> {
    return await this.postRepo.findMany(filter, pagination, ['tags', 'keywords', 'series'])
  }
}
