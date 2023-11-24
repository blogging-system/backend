import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateKeywordDto, DeleteKeywordDto } from '../dtos'
import { KeywordRepository } from '../repositories'
import { MESSAGES } from '../constants'

@Injectable()
export class KeywordService {
  constructor(private readonly keywordRepo: KeywordRepository) {}

  async createKeyword(data: CreateKeywordDto) {
    return await this.keywordRepo.createOne(data)
  }

  async deleteKeyword(data: DeleteKeywordDto) {
    return await this.keywordRepo.deleteOne(data)
  }

  async areKeywordsAvailable(tags: string[]) {
    try {
      await Promise.all(tags.map((tag) => this.keywordRepo.findOneById(tag)))
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
    }
  }
}
