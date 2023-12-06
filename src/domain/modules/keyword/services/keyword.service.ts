import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { PostService } from '@src/domain/modules/post/services'
import { KeywordRepository } from '../repositories'
import { ResultMessage } from '@src/shared/types'
import { CreateKeywordDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Keyword } from '../schemas'

@Injectable()
export class KeywordService {
  constructor(
    private readonly keywordRepo: KeywordRepository,
    @Inject(forwardRef(() => PostService)) private readonly postService: PostService,
  ) {}

  public async createKeyword(data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordRepo.createOne(data)
  }

  public async updateKeyword(keywordId: string, payload: CreateKeywordDto): Promise<Keyword> {
    await this.isKeywordAvailable(keywordId)

    return await this.keywordRepo.updateOne(keywordId, payload)
  }

  public async deleteKeyword(keywordId: string): Promise<ResultMessage> {
    await this.isKeywordAvailable(keywordId)
    await this.isKeywordAssociatedToPosts(keywordId)

    return await this.keywordRepo.deleteOne(keywordId)
  }

  public async isKeywordAssociatedToPosts(keywordId: string): Promise<void> {
    const isKeywordAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ keywordId })

    if (isKeywordAssociated) throw new BadRequestException(MESSAGES.KEYWORD_ASSOCIATED_TO_POST)
  }

  public async isKeywordAvailable(keywordId: string): Promise<Keyword> {
    return await this.keywordRepo.findOneById(keywordId)
  }

  public async areKeywordsAvailable(tags: string[]): Promise<void> {
    try {
      await Promise.all(tags.map((tag) => this.isKeywordAvailable(tag)))
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
    }
  }

  public async getAllKeywords(): Promise<Keyword[]> {
    return await this.keywordRepo.findMany()
  }

  public async getAllKeywordsCount(): Promise<ResultMessage> {
    return await this.keywordRepo.countDocuments()
  }
}
