import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateKeywordDto, DeleteKeywordDto } from '../dtos'
import { KeywordRepository } from '../repositories'
import { ResultMessage } from 'src/shared/types'
import { MESSAGES } from '../constants'
import { Keyword } from '../schemas'

@Injectable()
export class KeywordService {
  constructor(private readonly keywordRepo: KeywordRepository) {}

  async createKeyword(data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordRepo.createOne(data)
  }

  async updateKeyword(keywordId: string, payload: CreateKeywordDto): Promise<Keyword> {
    await this.isKeywordAvailable(keywordId)

    return await this.keywordRepo.updateOne(keywordId, payload)
  }

  async deleteKeyword(keywordId: string): Promise<ResultMessage> {
    await this.isKeywordAvailable(keywordId)

    // TODO:// check if it's associated to post or not!

    return await this.keywordRepo.deleteOne(keywordId)
  }

  async isKeywordAvailable(keywordId: string): Promise<Keyword> {
    return await this.keywordRepo.findOneById(keywordId)
  }

  async areKeywordsAvailable(tags: string[]): Promise<void> {
    try {
      await Promise.all(tags.map((tag) => this.keywordRepo.findOneById(tag)))
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
    }
  }
}
