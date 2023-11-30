import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { CreatePostDto, DeletePostDto } from '../../dtos'
import { ResultMessage } from '@src/shared/types'
import { Post as BlogPost } from '../../schemas'
import { PostsFilter } from '../../interfaces'
import { Pagination } from '@src/shared/dtos'
import { PostService } from '../../services'

@Controller('/admin/posts')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivatePostCoreController {
  constructor(private postService: PostService) {}

  @Post()
  public createPost(@Body() data: CreatePostDto): Promise<BlogPost> {
    return this.postService.createPost(data)
  }

  @Patch(':postId')
  public updatePost(@Param('postId') postId: string, @Body() payload: CreatePostDto): Promise<BlogPost> {
    return this.postService.updatePost(postId, payload)
  }

  @Delete(':postId')
  public deletePost(@Param() data: DeletePostDto): Promise<ResultMessage> {
    return this.postService.deletePost(data)
  }

  @Post('/publish/:postId')
  public publishPost(@Param('postId') postId: string): Promise<BlogPost> {
    return this.postService.publishPost(postId)
  }

  @Post('/unpublish/:postId')
  public unPublishPost(@Param('postId') postId: string): Promise<BlogPost> {
    return this.postService.unPublishPost(postId)
  }

  @Get('/latest')
  public getLatestPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getLatestPosts({ pagination, sortValue: -1 })
  }

  @Get('/published')
  public getPublishedPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getPublishedPosts({ pagination })
  }

  @Get('/unpublished')
  public getUnPublishedPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getUnPublishedPosts({ pagination })
  }

  @Get('/popular')
  public getPopularPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getPopularPosts({ pagination })
  }

  @Get('/unpopular')
  public getUnPopular(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getUnPopularPosts({ pagination })
  }

  @Get('/trending')
  public getTrendingPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return this.postService.getTrendingPosts({ pagination })
  }

  @Get(':slug')
  public getPostBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    return this.postService.getPostBySlug({ slug })
  }

  @Get()
  public getAllPosts(@Query() { tagId, seriesId, ...pagination }: Pagination): Promise<BlogPost[]> {
    const filter = { tagId, seriesId } as PostsFilter

    return this.postService.getAllPosts({ filter, pagination, sortValue: pagination.sort })
  }
}
