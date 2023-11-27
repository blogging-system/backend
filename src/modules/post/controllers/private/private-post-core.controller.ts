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
  async createPost(@Body() data: CreatePostDto): Promise<BlogPost> {
    return await this.postService.createPost(data)
  }

  @Patch(':postId')
  async updatePost(@Param('postId') postId: string, @Body() payload: CreatePostDto): Promise<BlogPost> {
    return await this.postService.updatePost(postId, payload)
  }

  @Delete(':postId')
  async deletePost(@Param() data: DeletePostDto): Promise<ResultMessage> {
    return await this.postService.deletePost(data)
  }

  @Post('/publish/:postId')
  async publishPost(@Param('postId') postId: string): Promise<BlogPost> {
    return await this.postService.publishPost(postId)
  }

  @Post('/unpublish/:postId')
  async unPublishPost(@Param('postId') postId: string): Promise<BlogPost> {
    return await this.postService.unPublishPost(postId)
  }

  @Get('/latest')
  async getLatestPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getLatestPosts({ pagination, sortValue: -1 })
  }

  @Get('/published')
  async getPublishedPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getPublishedPosts({ pagination })
  }

  @Get('/unpublished')
  async getUnPublishedPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getUnPublishedPosts({ pagination })
  }

  @Get('/popular')
  async getPopularPosts(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getPopularPosts({ pagination })
  }

  @Get('/unpopular')
  async getUnPopular(@Query() pagination: Pagination): Promise<BlogPost[]> {
    return await this.postService.getUnPopularPosts({ pagination })
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string): Promise<BlogPost> {
    return await this.postService.getPostBySlug({ slug })
  }

  @Get()
  async getAllPosts(@Query() query: Pagination): Promise<BlogPost[]> {
    const { tagId, seriesId, ...pagination } = query
    const filter = { tagId, seriesId } as PostsFilter

    return await this.postService.getAllPosts({ filter, pagination, sortValue: pagination.sort })
  }
}
