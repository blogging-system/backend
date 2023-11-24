import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { CreatePostDto, DeletePostDto, PostManipulationDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { Post } from '../schemas'
import { Model } from 'mongoose'
import slugify from 'slugify'

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

  async updateOne(postId: string, payload: PostManipulationDto): Promise<Post> {
    const isPostUpdated = await this.postModel.findByIdAndUpdate(
      postId,
      { ...payload, slug: slugify(payload.title) },
      { new: true },
    )

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
    return await this.postModel.findOne(query).lean()
  }

  async findMany(filter, { pageNumber, pageSize, sort }, populate: string[]): Promise<Post[]> {
    const query = {
      tags: filter.tagId,
      series: filter.seriesId,
      isPublished: true,
    }

    const foundPosts = await this.postModel
      .find(query)
      .skip((pageNumber - 1) * Number(pageSize))
      .limit(pageSize)
      .sort(sort == 1 ? 'isPublishedAt' : '-isPublishedAt')
      .lean()
      .populate(populate)

    if (foundPosts.length === 0) throw new NotFoundException(MESSAGES.POSTS_NOT_FOUND)

    return foundPosts
  }
}
