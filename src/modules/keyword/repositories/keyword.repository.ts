import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateKeywordDto, DeleteKeywordDto } from '../dtos'
import { DeleteKeywordResponse } from '../types'
import { InjectModel } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { Keyword } from '../schemas'
import { Model } from 'mongoose'

@Injectable()
export class KeywordRepository {
  constructor(@InjectModel(Keyword.name) private keywordModel: Model<Keyword>) {}

  async createOne(data: CreateKeywordDto): Promise<Keyword> {
    const isKeywordCreated = await this.keywordModel.create(data)

    if (!isKeywordCreated) throw new InternalServerErrorException(MESSAGES.CREATION_FAILED)

    return isKeywordCreated
  }

  async deleteOne(data: DeleteKeywordDto): Promise<DeleteKeywordResponse> {
    const isKeywordDeleted = await this.keywordModel.deleteOne({
      _id: data.keywordId,
    })

    if (isKeywordDeleted.deletedCount === 0) throw new InternalServerErrorException(MESSAGES.DELETE_FAILED)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  async findOneById(keywordId: string): Promise<Keyword> {
    const isPostFound = await this.keywordModel.findOne({ _id: keywordId }).lean()

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND)

    return isPostFound
  }
}
