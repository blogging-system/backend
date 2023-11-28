import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { CreatePostDto, DeletePostDto, PostsFilter } from '../../dtos'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { ResultMessage } from 'src/shared/types'
import { Post as BlogPost } from '../../schemas'
import { Pagination } from 'src/shared/dtos'
import { PostService } from '../../services'

@Controller('/admin/posts')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivatePostCoreController {
  constructor(private postService: PostService) {}

  @Post()
  public async createPost(@Body() data: CreatePostDto): Promise<BlogPost> {
    return await this.postService.createPost(data)
  }

  @Patch(':postId')
  public async updatePost(@Param('postId') postId: string, @Body() payload: CreatePostDto): Promise<BlogPost> {
    return await this.postService.updatePost(postId, payload)
  }

  @Delete(':postId')
  public async deletePost(@Param() data: DeletePostDto): Promise<ResultMessage> {
    return await this.postService.deletePost(data)
  }

  @Post('/publish/:postId')
  public async publishPost(@Param('postId') postId: string): Promise<BlogPost> {
    return await this.postService.publishPost(postId)
  }

  @Post('/unpublish/:postId')
  public async unPublishPost(@Param('postId') postId: string): Promise<BlogPost> {
    return await this.postService.unPublishPost(postId)
  }

  @Get('/latest')
  public async getLatestPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getLatestPosts({ pagination, sortValue: -1 })
  }

  @Get('/published')
  public async getPublishedPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getPublishedPosts({ pagination })
  }

  @Get('/unpublished')
  public async getUnPublishedPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getUnPublishedPosts({ pagination })
  }

  @Get('/popular')
  public async getPopularPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getPopularPosts({ pagination })
  }

  @Get('/unpopular')
  public async getUnPopular(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getUnPopularPosts({ pagination })
  }

  @Get('/trending')
  public async getTrendingPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getTrendingPosts({ pagination })
  }

  @Get(':slug')
  public async getPostBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    return await this.postService.getPostBySlug({ slug })
  }

  @Get()
  public async getAllPosts(@Query() query: Pagination): Promise<BlogPost[]> {
    const { tagId, seriesId, ...pagination } = query
    const filter = { tagId, seriesId } as PostsFilter

    return await this.postService.getAllPosts({ filter, pagination, sortValue: pagination.sort })
  }
}
