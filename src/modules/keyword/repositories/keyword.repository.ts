import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { DocumentIdType, ResultMessage } from '@src/shared/data/types'
import { InjectModel } from '@nestjs/mongoose'
import { CreateKeywordDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Model, Types } from 'mongoose'
import { Keyword } from '../schemas'

@Injectable()
export class KeywordRepository {
  constructor(@InjectModel(Keyword.name) private keywordModel: Model<Keyword>) {}

  public async createOne(data: CreateKeywordDto): Promise<Keyword> {
    const isKeywordCreated = await this.keywordModel.create(data)

    if (!isKeywordCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isKeywordCreated
  }

  public async updateOne(keywordId: DocumentIdType, payload: CreateKeywordDto): Promise<Keyword> {
    const isKeywordUpdated = await this.keywordModel.findByIdAndUpdate(keywordId, payload, { new: true })

    if (!isKeywordUpdated) throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED)

    return isKeywordUpdated
  }

  public async deleteOne(keywordId: DocumentIdType): Promise<ResultMessage> {
    const isKeywordDeleted = await this.keywordModel.deleteOne({
      _id: new Types.ObjectId(keywordId),
    })

    if (isKeywordDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async findOneById(keywordId: DocumentIdType): Promise<Keyword> {
    const isPostFound = await this.keywordModel.findOne({ _id: keywordId }).lean()

    if (!isPostFound) throw new NotFoundException(MESSAGES.KEYWORD_NOT_FOUND)

    return isPostFound
  }

  public async findMany(): Promise<Keyword[]> {
    const areTagsFound = await this.keywordModel.find().lean()
    if (areTagsFound.length === 0) throw new NotFoundException(MESSAGES.KEYWORDS_NOT_FOUND)

    return areTagsFound
  }

  public async countDocuments(): Promise<ResultMessage> {
    const count = await this.keywordModel.countDocuments().lean()

    return { count }
  }
}
