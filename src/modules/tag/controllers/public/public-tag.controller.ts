import { Controller, Get } from '@nestjs/common'
import { TagService } from '../../services'
import { Tag } from '../../schemas'

@Controller('tags')
export class PublicTagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  public getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags()
  }
}
