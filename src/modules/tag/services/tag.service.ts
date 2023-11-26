import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTagDto, DeleteTagDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { TagRepository } from '../repositories'
import { MESSAGES } from '../constants'
import { Tag } from '../schemas'

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async createTag(data: CreateTagDto): Promise<Tag> {
    return await this.tagRepo.createOne(data)
  }

  async updateTag(tagId: string, payload: CreateTagDto): Promise<Tag> {
    await this.isTagAvailable(tagId)

    return await this.tagRepo.updateOne(tagId, payload)
  }

  async deleteTag(tagId: string): Promise<ResultMessage> {
    await this.isTagAvailable(tagId)

    // TODO: Check if it's associated to any posts!
    return await this.tagRepo.deleteOne(tagId)
  }

  async isTagAvailable(tagId: string): Promise<Tag> {
    return await this.tagRepo.findOneById(tagId)
  }

  async areTagsAvailable(tagIds: string[]): Promise<void> {
    const array = await Promise.all(tagIds.map((id) => this.isTagAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }

  async getAllTags(): Promise<Tag[]> {
    return await this.tagRepo.findMany()
  }
}
