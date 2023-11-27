import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { CreateTagDto, DeleteTagDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { TagService } from '../services'
import { Tag } from '../schemas'

@Controller('/admin/tags')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateTagController {
  constructor(private tagService: TagService) {}

  @Post()
  async createTag(@Body() data: CreateTagDto): Promise<Tag> {
    return await this.tagService.createTag(data)
  }

  @Patch(':tagId')
  async updateTag(@Param('tagId') tagId: string, @Body() data: CreateTagDto): Promise<Tag> {
    return await this.tagService.updateTag(tagId, data)
  }

  @Delete(':tagId')
  async deleteTag(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.tagService.deleteTag(tagId)
  }

  @Get('/count')
  async getAllTagsCount() {
    return await this.tagService.getAllTagsCount()
  }
}
