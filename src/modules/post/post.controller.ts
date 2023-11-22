import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, DeletePostDto } from './dtos';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createKeyword(@Body() data: CreatePostDto) {
    return await this.postService.createPost(data);
  }

  @Patch(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body() payload: CreatePostDto,
  ) {
    return await this.postService.updatePost(postId, payload);
  }

  @Post('/publish/:postId')
  async publishPost(@Param('postId') postId: string) {
    return await this.postService.publishPost(postId);
  }

  @Post('/unpublish/:postId')
  async unPublishPost(@Param('postId') postId: string) {
    return await this.postService.unPublishPost(postId);
  }

  @Delete(':postId')
  async deletePost(@Param() data: DeletePostDto) {
    console.log({ data });
    return await this.postService.deletePost(data);
  }

  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string) {
    return await this.postService.getPostBySlug(slug);
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: string) {
    return await this.postService.getPostById(postId);
  }
}
