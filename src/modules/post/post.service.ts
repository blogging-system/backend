import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { KeywordService } from '../keyword/keyword.service';
import { SeriesService } from '../series/series.service';
import {
  GetAllPosts,
  CreatePostDto,
  DeletePostDto,
  PostManipulationDto,
} from './dtos';
import { TagService } from '../tag/tag.service';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from 'src/shared/dtos';
import { MESSAGES } from './constants';
import { Post } from './post.schema';
import { Model } from 'mongoose';
import slugify from 'slugify';

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
    await this.findOneById(postId);
    await this.tagService.areTagsAvailable(payload.tags);
    await this.keywordService.areKeywordsAvailable(payload.keywords);
    await this.seriesService.areSeriesAvailable(payload.series);

    return await this.updateOne(postId, payload);
  }

  async deletePost(data: DeletePostDto) {
    await this.findOneById(data.postId);

    return await this.deleteOne(data);
  }

  async publishPost(postId: string) {
    const foundPost = await this.findOneById(postId);

    if (foundPost.isPublished)
      throw new BadRequestException(MESSAGES.ALREADY_PUBLISHED);

    return await this.updateOne(postId, {
      title: foundPost.title,
      isPublished: true,
      isPublishedAt: new Date(Date.now()),
    });
  }

  async unPublishPost(postId: string) {
    const foundPost = await this.findOneById(postId);

    if (!foundPost.isPublished)
      throw new BadRequestException(MESSAGES.ALREADY_UNPUBLISHED);

    return await this.updateOne(postId, {
      title: foundPost.title,
      isPublished: false,
      isPublishedAt: new Date(Date.now()),
    });
  }

  async getPostById(postId: string) {
    return await this.findOneById(postId);
  }

  async getPostBySlug(slug: string) {
    return await this.findOne({ slug });
  }

  async getAllPosts(filter: GetAllPosts, pagination: Pagination) {
    return await this.findMany(filter, pagination, [
      'tags',
      'keywords',
      'series',
    ]);
  }

  private async createOne(data: CreatePostDto) {
    const isPostCreated = await this.postModel.create({
      ...data,
      slug: slugify(data.title),
    });

    if (!isPostCreated)
      throw new InternalServerErrorException(MESSAGES.CREATION_FAILED);

    return isPostCreated;
  }

  private async updateOne(postId: string, payload: PostManipulationDto) {
    const isPostUpdated = await this.postModel.findByIdAndUpdate(
      postId,
      { ...payload, slug: slugify(payload.title) },
      { new: true },
    );

    if (!isPostUpdated)
      throw new InternalServerErrorException(MESSAGES.UPDATE_FAILED);

    return isPostUpdated;
  }

  private async deleteOne(data: DeletePostDto) {
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

  private async findOne(query: any) {
    const isPostFound = await this.postModel.findOne(query).lean();

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND);

    return isPostFound;
  }

  private async findMany(
    filter,
    { pageNumber, pageSize, sort },
    populate: string[],
  ) {
    const query = {
      tags: filter.tagId,
      series: filter.seriesId,
      isPublished: true,
    };

    const foundPosts = await this.postModel
      .find(query)
      .skip((pageNumber - 1) * Number(pageSize))
      .limit(pageSize)
      .sort(sort == 1 ? 'isPublishedAt' : '-isPublishedAt')
      .lean()
      .populate(populate);

    if (foundPosts.length === 0)
      throw new NotFoundException(MESSAGES.POSTS_NOT_FOUND);

    return foundPosts;
  }
}
