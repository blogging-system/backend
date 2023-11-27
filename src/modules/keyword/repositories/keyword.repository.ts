import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ResultMessage } from 'src/shared/types'
import { InjectModel } from '@nestjs/mongoose'
import { CreateKeywordDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Model, Types } from 'mongoose'
import { Keyword } from '../schemas'

@Injectable()
export class KeywordRepository {
  constructor(@InjectModel(Keyword.name) private keywordModel: Model<Keyword>) {}

  async createOne(data: CreateKeywordDto): Promise<Keyword> {
    const isKeywordCreated = await this.keywordModel.create(data)

    if (!isKeywordCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isKeywordCreated
  }

  async updateOne(keywordId: string, payload: CreateKeywordDto): Promise<Keyword> {
    const isKeywordUpdated = await this.keywordModel.findByIdAndUpdate(keywordId, payload, { new: true })

    if (!isKeywordUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isKeywordUpdated
  }

  async deleteOne(keywordId: string): Promise<ResultMessage> {
    const isKeywordDeleted = await this.keywordModel.deleteOne({
      _id: new Types.ObjectId(keywordId),
    })

    if (isKeywordDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  async findOneById(keywordId: string): Promise<Keyword> {
    const isPostFound = await this.keywordModel.findOne({ _id: keywordId }).lean()

    if (!isPostFound) throw new NotFoundException(MESSAGES.KEYWORD_NOT_FOUND)

    return isPostFound
  }

  async findOne(query: any): Promise<Keyword> {
    return await this.keywordModel.findOne(query).lean()
  }

  async findMany(): Promise<Keyword[]> {
    const areTagsFound = await this.keywordModel.find().lean()

    if (areTagsFound.length === 0) throw new NotFoundException(MESSAGES.KEYWORDS_NOT_FOUND)

    return areTagsFound
  }

  async countDocuments(): Promise<ResultMessage> {
    const count = await this.keywordModel.countDocuments().lean()

    return { count }
  }
}
