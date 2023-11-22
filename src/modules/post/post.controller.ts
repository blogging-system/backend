import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, DeletePostDto } from './dtos';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createKeyword(@Body() data: CreatePostDto) {
    return await this.postService.createPost(data);
  }

  @Delete(':postId')
  async deletePost(@Param() data: DeletePostDto) {
    console.log({ data });
    return await this.postService.deletePost(data);
  }
}
