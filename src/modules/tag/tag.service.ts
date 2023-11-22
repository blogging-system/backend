import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './tag.schema';
import { CreateTagDto, DeleteTagDto } from './dtos';
import { MESSAGES } from './constants';
import { Model } from 'mongoose';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name) private readonly keywordModel: Model<Tag>,
  ) {}

  async createTag(data: CreateTagDto) {
    return await this.createOne(data);
  }

  async deleteTag(data: DeleteTagDto) {
    return await this.deleteOne(data);
  }

  async areTagsAvailable(tags: string[]) {
    try {
      await Promise.all(tags.map((tag) => this.findOneById(tag)));
    } catch (error) {
      throw new NotFoundException(MESSAGES.NOT_AVAILABLE);
    }
  }

  private async createOne(data: CreateTagDto) {
    const isTagCreated = await this.keywordModel.create(data);

    if (!isTagCreated)
      throw new InternalServerErrorException(MESSAGES.CREATION_FAILED);

    return isTagCreated;
  }

  private async deleteOne(data: DeleteTagDto) {
    await this.findOneById(data.tagId);

    const isTagDeleted = await this.keywordModel.deleteOne({
      _id: data.tagId,
    });

    if (isTagDeleted.deletedCount === 0)
      throw new InternalServerErrorException(MESSAGES.DELETE_FAILED);

    return { message: MESSAGES.DELETED_SUCCESSFULLY };
  }

  private async findOneById(tagId: string) {
    const isTagFound = await this.keywordModel.findOne({ _id: tagId }).lean();

    if (!isTagFound) throw new NotFoundException(MESSAGES.TAG_NOT_FOUND);

    return isTagFound;
  }
}
