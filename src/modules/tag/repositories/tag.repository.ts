import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { Model } from 'mongoose'
import { MESSAGES } from '../constants'
import { Tag } from '../schemas/tag.schema'
import { InjectModel } from '@nestjs/mongoose'
import { CreateTagDto, DeleteTagDto } from '../dtos'
import { DeleteTagResponse } from '../types'

@Injectable()
export class TagRepository {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}

  async createOne(data: CreateTagDto): Promise<Tag> {
    const isTagCreated = await this.tagModel.create(data)

    if (!isTagCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isTagCreated
  }

  async deleteOne(data: DeleteTagDto): Promise<DeleteTagResponse> {
    const isTagDeleted = await this.tagModel.deleteOne({
      _id: data.tagId,
    })

    if (isTagDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  async findOneById(tagId: string): Promise<Tag> {
    const isTagFound = await this.tagModel.findOne({ _id: tagId }).lean()

    if (!isTagFound) throw new NotFoundException(MESSAGES.TAG_NOT_FOUND)

    return isTagFound
  }

  async findOne(query: any): Promise<Tag> {
    return await this.tagModel.findOne(query).lean()
  }
}
