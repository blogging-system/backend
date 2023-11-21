import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async createPost(@Body() data: CreatePostDto) {
    return await this.postService.createPost(data);
  }
}
