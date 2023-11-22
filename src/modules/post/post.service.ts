import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { KeywordService } from '../keyword/keyword.service';
import { SeriesService } from '../series/series.service';
import { CreatePostDto, DeletePostDto } from './dtos';
import { TagService } from '../tag/tag.service';
import { InjectModel } from '@nestjs/mongoose';
import { MESSAGES } from './constants';
import { Post } from './post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly keywordService: KeywordService,
    private readonly seriesService: SeriesService,
    private readonly tagService: TagService,
  ) {}

  async createPost(data: CreatePostDto) {
    await this.tagService.areTagsAvailable(data.tags);
    await this.keywordService.areKeywordsAvailable(data.keywords);
    await this.seriesService.areSeriesAvailable(data.series);

    return await this.createOne(data);
  }

  async updatePost(postId: string, payload: CreatePostDto) {
    await this.tagService.areTagsAvailable(payload.tags);
    await this.keywordService.areKeywordsAvailable(payload.keywords);
    await this.seriesService.areSeriesAvailable(payload.series);

    return await this.updateOne(postId, payload);
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

  private async updateOne(postId: string, payload: CreatePostDto) {
    await this.findOneById(postId);

    const isPostUpdated = await this.postModel.findByIdAndUpdate(
      postId,
      payload,
      { new: true },
    );

    if (!isPostUpdated)
      throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED);

    return isPostUpdated;
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
