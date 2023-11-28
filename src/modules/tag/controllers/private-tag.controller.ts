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
  public async createTag(@Body() data: CreateTagDto): Promise<Tag> {
    return await this.tagService.createTag(data)
  }

  @Patch(':tagId')
  public async updateTag(@Param('tagId') tagId: string, @Body() data: CreateTagDto): Promise<Tag> {
    return await this.tagService.updateTag(tagId, data)
  }

  @Delete(':tagId')
  public async deleteTag(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return await this.tagService.deleteTag(tagId)
  }

  @Get('/count')
  public async getAllTagsCount() {
    return await this.tagService.getAllTagsCount()
  }
}
