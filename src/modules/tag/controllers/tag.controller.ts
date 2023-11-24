import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { CreateTagDto, DeleteTagDto } from '../dtos'
import { TagService } from '../services/tag.service'

@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  async createTag(@Body() data: CreateTagDto) {
    return await this.tagService.createTag(data)
  }

  @Delete(':tagId')
  async deleteTag(@Param() data: DeleteTagDto) {
    return await this.tagService.deleteTag(data)
  }
}
