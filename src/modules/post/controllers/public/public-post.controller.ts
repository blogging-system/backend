import { Controller, Get, Param, Query } from '@nestjs/common'
import { GetPostBySlug } from '../../interfaces'
import { Pagination } from '@src/shared/contracts/dtos'
import { PostService } from '../../services'
import { Post } from '../../schemas'
import { FilterPostDto } from '../../dtos'

@Controller('posts')
export class PublicPostController {
  constructor(private postService: PostService) {}

  @Get(':slug')
  public getPostBySlug(@Param() { slug }: GetPostBySlug): Promise<Post> {
    return this.postService.getPostBySlug({ slug, isPublished: true })
  }

  @Get()
  public getAllPosts(@Query() { tagId, seriesId, ...pagination }: Pagination & FilterPostDto): Promise<Post[]> {
    return this.postService.getAllPosts({ pagination, seriesId, tagId, isPublished: true })
  }
}
