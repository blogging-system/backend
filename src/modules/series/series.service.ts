import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { MESSAGES } from './constants';
import { Series } from './series.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSeriesDto, DeleteSeriesDto } from './dtos';

@Injectable()
export class SeriesService {
  constructor(@InjectModel(Series.name) private seriesModel: Model<Series>) {}

  async createSeries(data: CreateSeriesDto) {
    return await this.createOne(data);
  }

  async deleteSeries(data: DeleteSeriesDto) {
    return await this.deleteOne(data);
  }

  private async createOne(data: CreateSeriesDto) {
    const isSeriesCreated = await this.seriesModel.create(data);

    if (!isSeriesCreated)
      throw new InternalServerErrorException(MESSAGES.CREATION_FAILED);

    return isSeriesCreated;
  }

  private async deleteOne(data: DeleteSeriesDto) {
    await this.findOneById(data.seriesId);

    const isSeriesDeleted = await this.seriesModel.deleteOne({
      _id: data.seriesId,
    });

    if (isSeriesDeleted.deletedCount === 0)
      throw new InternalServerErrorException(MESSAGES.DELETE_FAILED);

    return { message: MESSAGES.DELETED_SUCCESSFULLY };
  }

  private async findOneById(seriesId: string) {
    const isSeriesFound = await this.seriesModel
      .findOne({ _id: seriesId })
      .lean();

    if (!isSeriesFound) throw new NotFoundException(MESSAGES.SERIES_NOT_FOUND);

    return isSeriesFound;
  }
}
