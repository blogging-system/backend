import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common";
import { DocumentIdType, ResultMessage } from "@src/shared/contracts/types";
import { PostService } from "@src/modules/post/services";
import { KeywordRepository } from "../repositories";
import { CreateKeywordDto } from "../dtos";
import { MESSAGES } from "../constants";
import { Keyword } from "../schemas";

@Injectable()
export class KeywordService {
  constructor(
    private readonly keywordRepo: KeywordRepository,
    @Inject(forwardRef(() => PostService)) private readonly postService: PostService,
  ) {}

  public async createKeyword(data: CreateKeywordDto): Promise<Keyword> {
    return await this.keywordRepo.createOne(data);
  }

  public async updateKeyword(keywordId: DocumentIdType, payload: CreateKeywordDto): Promise<Keyword> {
    await this.isKeywordAvailable(keywordId);

    return await this.keywordRepo.updateOne(keywordId, payload);
  }

  public async deleteKeyword(keywordId: DocumentIdType): Promise<ResultMessage> {
    await this.isKeywordAvailable(keywordId);
    await this.isKeywordAssociatedToPosts(keywordId);

    await this.keywordRepo.deleteOne(keywordId);

    return { message: MESSAGES.DELETED_SUCCESSFULLY };
  }

  public async isKeywordAssociatedToPosts(keywordId: DocumentIdType): Promise<void> {
    const isKeywordAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ keywordId });

    if (isKeywordAssociated) throw new BadRequestException(MESSAGES.KEYWORD_ASSOCIATED_TO_POST);
  }

  public async isKeywordAvailable(keywordId: DocumentIdType): Promise<boolean> {
    return await this.keywordRepo.isFound({ _id: keywordId });
  }

  public async areKeywordsAvailable(keywords: DocumentIdType[]): Promise<void> {
    const areAvailable = await Promise.all(keywords.map((keyword) => this.isKeywordAvailable(keyword)));

    if (areAvailable.includes(false)) throw new NotFoundException(MESSAGES.NOT_AVAILABLE);
  }

  public async getAllKeywords(): Promise<Keyword[]> {
    return await this.keywordRepo.find({});
  }

  public async getAllKeywordsCount(): Promise<ResultMessage> {
    return await this.keywordRepo.countDocuments({});
  }
}
