import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common'
import { PostService } from 'src/modules/post/services'
import { ResultMessage } from 'src/shared/types'
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

  async createTag(data: CreateTagDto): Promise<Tag> {
    return await this.tagRepo.createOne(data)
  }

  async updateTag(tagId: string, payload: CreateTagDto): Promise<Tag> {
    await this.isTagAvailable(tagId)

    return await this.tagRepo.updateOne(tagId, payload)
  }

  async deleteTag(tagId: string): Promise<ResultMessage> {
    await this.isTagAvailable(tagId)
    await this.isTagAssociatedToPosts(tagId)

    return await this.tagRepo.deleteOne(tagId)
  }

  async isTagAvailable(tagId: string): Promise<Tag> {
    return await this.tagRepo.findOneById(tagId)
  }

  async isTagAssociatedToPosts(tagId: string): Promise<void> {
    const isTagAssociated = await this.postService.arePostsAvailableForGivenEntitiesIds({ tagId })

    if (isTagAssociated) throw new BadRequestException(MESSAGES.POST_ASSOCIATED_TO_POST)
  }

  async areTagsAvailable(tagIds: string[]): Promise<void> {
    const array = await Promise.all(tagIds.map((id) => this.isTagAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepo.findMany()
  }

  async getAllTagsCount(): Promise<ResultMessage> {
    return await this.tagRepo.countDocuments()
  }
}
