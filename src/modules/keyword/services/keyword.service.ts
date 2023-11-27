import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { CreateKeywordDto, DeleteKeywordDto } from '../dtos'
import { KeywordRepository } from '../repositories'
import { ResultMessage } from 'src/shared/types'
import { MESSAGES } from '../constants'
import { Keyword } from '../schemas'
import { PostService } from 'src/modules/post/services'

@Injectable()
export class KeywordService {
  constructor(
    private readonly keywordRepo: KeywordRepository,
    @Inject(forwardRef(() => PostService)) private readonly postService: PostService,
  ) {}

  async createKeyword(data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordRepo.createOne(data)
  }

  async updateKeyword(keywordId: string, payload: CreateKeywordDto): Promise<Keyword> {
    await this.isKeywordAvailable(keywordId)

    return await this.keywordRepo.updateOne(keywordId, payload)
  }

  async deleteKeyword(keywordId: string): Promise<ResultMessage> {
    await this.isKeywordAvailable(keywordId)
    await this.isKeywordAssociatedToPosts(keywordId)

    return await this.keywordRepo.deleteOne(keywordId)
  }

  async isKeywordAssociatedToPosts(keywordId: string): Promise<void> {
    const isTagAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ keywordId })

    if (isTagAssociated) throw new BadRequestException(MESSAGES.KEYWORD_ASSOCIATED_TO_POST)
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

  async getAllKeywords(): Promise<Keyword[]> {
    return await this.keywordRepo.findMany()
  }
}
