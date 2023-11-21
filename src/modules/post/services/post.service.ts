import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogPost } from '../schemas/post.schema';
import { CreatePostDto } from '../dtos';

@Injectable()
export class PostService {
  constructor(@InjectModel(BlogPost.name) private postModel: Model<BlogPost>) {}

  @Post()
  async createPost(data: CreatePostDto) {
    return await this.postModel.create(data);
  }
}
