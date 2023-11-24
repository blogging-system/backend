import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { CreateTagDto, DeleteTagDto } from '../dtos'
import { DeleteTagResponse } from '../types'
import { TagService } from '../services'
import { Tag } from '../schemas'

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  async createTag(@Body() data: CreateTagDto): Promise<Tag> {
    return await this.tagService.createTag(data)
  }

  @Delete(':tagId')
  async deleteTag(@Param() data: DeleteTagDto): Promise<DeleteTagResponse> {
    return await this.tagService.deleteTag(data)
  }
}
