import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { GetAllPostsDto, GetAllPostsQuery, PostManipulation } from '../interfaces'
import { CountDocumentsDto, CountDocumentsQuery } from '@src/shared/dtos'
import { CreatePostDto, DeletePostDto } from '../dtos'
import { ResultMessage } from '@src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { Entities } from '@src/shared/enums'
import { MESSAGES } from '../constants'
import { Post } from '../schemas'
import { Model } from 'mongoose'
import slugify from 'slugify'

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  public async createOne(data: CreatePostDto): Promise<Post> {
    const isPostCreated = await this.postModel.create({
      ...data,
      slug: slugify(data.title, { lower: true }),
    })

    if (!isPostCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isPostCreated
  }

  public async updateOne(postId: string, payload: Partial<PostManipulation>): Promise<Post> {
    const query: Partial<PostManipulation> = { ...payload }

    if (payload.title) query.slug = slugify(payload.title, { lower: true })

    const isPostUpdated = await this.postModel.findByIdAndUpdate(postId, query, { new: true })

    if (!isPostUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isPostUpdated
  }

  public async deleteOne(data: DeletePostDto): Promise<ResultMessage> {
    const isPostDeleted = await this.postModel.deleteOne({ _id: data.postId })

    if (isPostDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async findOneById(postId: string): Promise<Post> {
    const isPostFound = await this.postModel.findOne({ _id: postId }).lean()

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND)

    return isPostFound
  }

  public async findOne(query: any): Promise<Post> {
    return await this.postModel.findOne(query).populate([Entities.TAGS, Entities.KEYWORDS, Entities.SERIES]).lean()
  }

  public async findMany({ pagination, filter, isPublished, sortCondition }: GetAllPostsDto): Promise<Post[]> {
    const { pageNumber, pageSize } = pagination
    const query: GetAllPostsQuery = {}

    if (filter?.tagId) query.tags = filter.tagId
    if (filter?.seriesId) query.series = filter.seriesId
    if (isPublished) query.isPublished = isPublished
    if (isPublished !== undefined) query.isPublished = isPublished

    const foundPosts = await this.postModel
      .find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort(sortCondition)
      .lean()
      .populate([Entities.TAGS, Entities.KEYWORDS, Entities.SERIES])

    if (foundPosts.length === 0) throw new NotFoundException(MESSAGES.POSTS_NOT_FOUND)

    return foundPosts
  }

  public async countDocuments({ isPublished, tagId, keywordId, seriesId }: CountDocumentsDto): Promise<ResultMessage> {
    const query: CountDocumentsQuery = {}

    if (isPublished) query.isPublished = isPublished
    if (tagId) query.tags = tagId
    if (keywordId) query.keywords = keywordId
    if (seriesId) query.series = seriesId

    const count = await this.postModel.countDocuments(query).lean()

    return { count }
  }
}
