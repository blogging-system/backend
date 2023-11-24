import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Tag } from '../schemas/tag.schema'
import { CreateTagDto, DeleteTagDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Model } from 'mongoose'
import { TagRepository } from '../repositories/tag.repository'

@Injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  async createTag(data: CreateTagDto) {
    return await this.tagRepo.createOne(data)
  }

  async deleteTag(data: DeleteTagDto) {
    return await this.tagRepo.deleteOne(data)
  }

  async isTagAvailable(tagId: string): Promise<boolean> {
    const isTagFound = await this.tagRepo.findOne({ _id: tagId })

    return !!isTagFound
  }

  async areTagsAvailable(tagIds: string[]) {
    const array = await Promise.all(tagIds.map((id) => this.isTagAvailable(id)))

    const areTagsAvailable = array.every((available) => available)

    if (!areTagsAvailable) throw new NotFoundException(MESSAGES.NOT_AVAILABLE)
  }
}
