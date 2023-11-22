import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto, DeletePostDto } from './dtos';
import { Model } from 'mongoose';
import { MESSAGES } from './constants';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(data: CreatePostDto) {
    return await this.createOne(data);
  }

  async deletePost(data: DeletePostDto) {
    return await this.deleteOne(data);
  }

  private async createOne(data: CreatePostDto) {
    const isPostCreated = await this.postModel.create(data);

    if (!isPostCreated)
      throw new InternalServerErrorException(MESSAGES.CREATION_FAILED);

    return isPostCreated;
  }

  private async deleteOne(data: DeletePostDto) {
    await this.findOneById(data.postId);

    const isPostDeleted = await this.postModel.deleteOne({ _id: data.postId });

    if (isPostDeleted.deletedCount === 0)
      throw new InternalServerErrorException(MESSAGES.DELETE_FAILED);

    return { message: MESSAGES.DELETED_SUCCESSFULLY };
  }

  private async findOneById(postId: string) {
    const isPostFound = await this.postModel.findOne({ _id: postId }).lean();

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND);

    return isPostFound;
  }
}
