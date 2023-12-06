import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { DocumentIdType, ResultMessage } from '@src/shared/contracts/types'
import { PostService } from '@src/modules/post/services'
import { TagRepository } from '../repositories'
import { MESSAGES } from '../constants'
import { CreateTagDto } from '../dtos'
import { Tag } from '../schemas'

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepo: TagRepository,
    @Inject(forwardRef(() => PostService)) private readonly postService: PostService,
  ) {}

  public async createTag(data: CreateTagDto): Promise<Tag> {
    return await this.tagRepo.createOne(data)
  }

  public async updateTag(tagId: DocumentIdType, payload: CreateTagDto): Promise<Tag> {
    return await this.tagRepo.updateOne(tagId, payload)
  }

  public async deleteTag(tagId: DocumentIdType): Promise<ResultMessage> {
    await this.isTagAssociatedToPosts(tagId)

    await this.tagRepo.deleteOne(tagId)

    return { message: MESSAGES.DELETED_SUCCESSFULLY }
  }

  public async getTag(tagId: DocumentIdType): Promise<Tag> {
    return await this.tagRepo.findOne({ _id: tagId })
  }

  public async isTagAssociatedToPosts(tagId: DocumentIdType): Promise<void> {
    const isTagAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ tagId })

    if (isTagAssociated) throw new BadRequestException(MESSAGES.POST_ASSOCIATED_TO_POST)
  }

  private async isTagAvailable(tagId: DocumentIdType): Promise<boolean> {
    return await this.tagRepo.isFound({ _id: tagId })
  }

  public async areTagsAvailable(tagIds: DocumentIdType[]): Promise<void> {
    const areAvailable = await Promise.all(tagIds.map((id) => this.isTagAvailable(id)))

    if (areAvailable.includes(false)) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }

  public async getAllTags(): Promise<Tag[]> {
    return await this.tagRepo.find({})
  }

  public async getAllTagsCount(): Promise<ResultMessage> {
    return await this.tagRepo.countDocuments({})
  }
}
