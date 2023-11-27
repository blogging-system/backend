import { CreatePostDto, DeletePostDto, PostManipulationDto, GetAllPostsDto } from '../dtos'
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { ResultMessage } from 'src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { Post } from '../schemas'
import { Model } from 'mongoose'
import slugify from 'slugify'
import { CountDocumentsDto, CountDocumentsQuery } from 'src/shared/dtos/count-document.dto'
import { SortFieldOptions } from 'src/shared/enums'

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createOne(data: CreatePostDto): Promise<Post> {
    const isPostCreated = await this.postModel.create({
      ...data,
      slug: slugify(data.title),
    })

    if (!isPostCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isPostCreated
  }

  async updateOne(postId: string, payload: Partial<PostManipulationDto>): Promise<Post> {
    const query: Partial<PostManipulationDto> = { ...payload }

    if (payload.title) query.slug = slugify(payload.title)

    const isPostUpdated = await this.postModel.findByIdAndUpdate(postId, query, { new: true })

    if (!isPostUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isPostUpdated
  }

  async deleteOne(data: DeletePostDto): Promise<ResultMessage> {
    const isPostDeleted = await this.postModel.deleteOne({ _id: data.postId })

    if (isPostDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  async findOneById(postId: string): Promise<Post> {
    const isPostFound = await this.postModel.findOne({ _id: postId }).lean()

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND)

    return isPostFound
  }

  async findOne(query: any): Promise<Post> {
    return await this.postModel.findOne(query).populate(['tags', 'keywords', 'series']).lean()
  }

  async findMany({ pagination, filter, isPublished, sortCondition }: GetAllPostsDto): Promise<Post[]> {
    const { pageNumber, pageSize } = pagination
    const query: { tags?: string; series?: string; isPublished?: boolean } = {}

    if (filter?.tagId) query.tags = filter.tagId
    if (filter?.seriesId) query.series = filter.seriesId
    if (isPublished) query.isPublished = isPublished

    const foundPosts = await this.postModel
      .find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort(sortCondition)
      .populate(['tags', 'keywords', 'series'])
      .lean()

    if (foundPosts.length === 0) throw new NotFoundException(MESSAGES.POSTS_NOT_FOUND)

    return foundPosts
  }

  async countDocuments({ isPublished, tagId, keywordId, seriesId }: CountDocumentsDto): Promise<ResultMessage> {
    const query: CountDocumentsQuery = {}

    if (isPublished) query.isPublished = isPublished
    if (tagId) query.tags = tagId
    if (keywordId) query.keywords = keywordId
    if (seriesId) query.series = seriesId

    const count = await this.postModel.countDocuments(query).lean()

    return { count }
  }
}
