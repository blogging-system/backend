import { Controller, Get, Param, Query } from '@nestjs/common'
import { GetPostBySlug, PostsFilter } from '../../interfaces'
import { Pagination } from '@src/shared/dtos'
import { PostService } from '../../services'
import { Post } from '../../schemas'

@Controller('posts')
export class PublicPostController {
  constructor(private postService: PostService) {}

  @Get(':slug')
  public getPostBySlug(@Param() { slug }: GetPostBySlug): Promise<Post> {
    return this.postService.getPostBySlug({ slug, isPublished: true })
  }

  @Get()
  public getAllPosts(@Query() { tagId, seriesId, ...pagination }: Pagination): Promise<Post[]> {
    const filter = { tagId, seriesId } as PostsFilter

    return this.postService.getAllPosts({ filter, pagination, isPublished: true })
  }
}
