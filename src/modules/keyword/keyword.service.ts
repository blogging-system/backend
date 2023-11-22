import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Keyword } from './keyword.schema';
import { CreateKeywordDto, DeleteKeywordDto } from './dtos';
import { MESSAGES } from './constants';
import { Model } from 'mongoose';

@Injectable()
export class KeywordService {
  constructor(
    @InjectModel(Keyword.name) private keywordModel: Model<Keyword>,
  ) {}

  async createKeyword(data: CreateKeywordDto) {
    return await this.createOne(data);
  }

  async deleteKeyword(data: DeleteKeywordDto) {
    return await this.deleteOne(data);
  }

  private async createOne(data: CreateKeywordDto) {
    const isKeywordCreated = await this.keywordModel.create(data);

    if (!isKeywordCreated)
      throw new InternalServerErrorException(MESSAGES.CREATION_FAILED);

    return isKeywordCreated;
  }

  private async deleteOne(data: DeleteKeywordDto) {
    await this.findOneById(data.keywordId);

    const isKeywordDeleted = await this.keywordModel.deleteOne({
      _id: data.keywordId,
    });

    if (isKeywordDeleted.deletedCount === 0)
      throw new InternalServerErrorException(MESSAGES.DELETE_FAILED);

    return { message: MESSAGES.DELETED_SUCCESSFULLY };
  }

  private async findOneById(keywordId: string) {
    const isPostFound = await this.keywordModel
      .findOne({ _id: keywordId })
      .lean();

    if (!isPostFound) throw new NotFoundException(MESSAGES.POST_NOT_FOUND);

    return isPostFound;
  }
}
