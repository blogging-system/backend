import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { ResultMessage } from '@src/shared/types'
import { TagService } from '../../services'
import { CreateTagDto } from '../../dtos'
import { Tag } from '../../schemas'

@Controller('/admin/tags')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateTagController {
  constructor(private tagService: TagService) {}

  @Post()
  public createTag(@Body() data: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(data)
  }

  @Patch(':tagId')
  public updateTag(@Param('tagId') tagId: string, @Body() data: CreateTagDto): Promise<Tag> {
    return this.tagService.updateTag(tagId, data)
  }

  @Delete(':tagId')
  public deleteTag(@Param('tagId') tagId: string): Promise<ResultMessage> {
    return this.tagService.deleteTag(tagId)
  }

  @Get('/count')
  public getAllTagsCount(): Promise<ResultMessage> {
    return this.tagService.getAllTagsCount()
  }
}
