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

  async deleteKeyword(data: DeleteKeywordDto): Promise<ResultMessage> {
    return await this.keywordRepo.deleteOne(data)
  }

  async areKeywordsAvailable(tags: string[]): Promise<void> {
    try {
      await Promise.all(tags.map((tag) => this.keywordRepo.findOneById(tag)))
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
    }
  }
}
