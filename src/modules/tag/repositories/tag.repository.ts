import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { ResultMessage } from 'src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { CreateTagDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Model, Types } from 'mongoose'
import { Tag } from '../schemas'

@Injectable()
export class TagRepository {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}

  public async createOne(data: CreateTagDto): Promise<Tag> {
    const isTagCreated = await this.tagModel.create(data)

    if (!isTagCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isTagCreated
  }

  public async updateOne(tagId: string, payload: CreateTagDto): Promise<Tag> {
    const isTagUpdated = await this.tagModel.findByIdAndUpdate(tagId, payload, { new: true })

    if (!isTagUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isTagUpdated
  }

  public async deleteOne(tagId: string): Promise<ResultMessage> {
    const isTagDeleted = await this.tagModel.deleteOne({
      _id: new Types.ObjectId(tagId),
    })

    if (isTagDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async findOneById(tagId: string): Promise<Tag> {
    const isTagFound = await this.tagModel.findOne({ _id: tagId }).lean()

    if (!isTagFound) throw new NotFoundException(MESSAGES.TAG_NOT_FOUND)

    return isTagFound
  }

  public async findOne(query: any): Promise<Tag> {
    return await this.tagModel.findOne(query).lean()
  }

  public async findMany(): Promise<Tag[]> {
    const areTagsFound = await this.tagModel.find().lean()

    if (areTagsFound.length === 0) throw new NotFoundException(MESSAGES.TAGS_NOT_FOUND)

    return areTagsFound
  }

  public async countDocuments(): Promise<ResultMessage> {
    const count = await this.tagModel.countDocuments().lean()

    return { count }
  }
}
