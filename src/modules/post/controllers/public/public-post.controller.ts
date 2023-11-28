import { Controller, Get, Param, Query } from '@nestjs/common'
import { Pagination } from 'src/shared/dtos'
import { PostService } from '../../services'
import { PostsFilter } from '../../dtos'
import { Post } from '../../schemas'

@Controller('posts')
export class PublicPostController {
  constructor(private postService: PostService) {}

  @Get(':slug')
  public async getPostBySlug(@Param('slug') slug: string): Promise<Post> {
    const query = { slug, isPublished: true }
    return await this.postService.getPostBySlug(query)
  }

  @Get()
  public async getAllPosts(@Query() query: Pagination): Promise<Post[]> {
    const { tagId, seriesId, ...pagination } = query
    const filter = { tagId, seriesId } as PostsFilter

    return await this.postService.getAllPosts({ filter, pagination, isPublished: true })
  }
}
