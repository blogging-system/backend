import { Controller, Get, Param, Query } from '@nestjs/common'
import { Pagination } from 'src/shared/dtos'
import { PostService } from '../services'
import { GetAllPostsFilter } from '../dtos'
import { Post } from '../schemas'

@Controller('posts')
export class PublicPostController {
  constructor(private postService: PostService) {}

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string): Promise<Post> {
    return await this.postService.getPostBySlug(slug)
  }

  @Get()
  async getAllPosts(@Query() query: Pagination): Promise<Post[]> {
    const { tagId, seriesId, ...pagination } = query
    const filter = { tagId, seriesId }

    return await this.postService.getAllPosts(filter as GetAllPostsFilter, pagination as Pagination, true)
  }
}
