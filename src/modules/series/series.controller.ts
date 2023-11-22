import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateSeriesDto, DeleteSeriesDto } from './dtos';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  async createTag(@Body() data: CreateSeriesDto) {
    return await this.seriesService.createSeries(data);
  }

  @Delete(':seriesId')
  async deleteTag(@Param() data: DeleteSeriesDto) {
    return await this.seriesService.deleteSeries(data);
  }
}
