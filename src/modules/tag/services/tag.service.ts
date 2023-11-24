import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTagDto, DeleteTagDto } from '../dtos'
import { TagRepository } from '../repositories'
import { DeleteTagResponse } from '../types'
import { MESSAGES } from '../constants'
import { Tag } from '../schemas'

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async createTag(data: CreateTagDto): Promise<Tag> {
    return await this.tagRepo.createOne(data)
  }

  async deleteTag(data: DeleteTagDto): Promise<DeleteTagResponse> {
    const isTagAvailable = await this.isTagAvailable(data.tagId)

    if (!isTagAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)

    return await this.tagRepo.deleteOne(data)
  }

  async isTagAvailable(tagId: string): Promise<boolean> {
    const isTagFound = await this.tagRepo.findOne({ _id: tagId })

    return !!isTagFound
  }

  async areTagsAvailable(tagIds: string[]): Promise<void> {
    const array = await Promise.all(tagIds.map((id) => this.isTagAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }
}
