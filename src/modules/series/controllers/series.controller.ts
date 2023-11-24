import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { SeriesService } from '../services'
import { Series } from '../schemas'

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  async createTag(@Body() data: CreateSeriesDto): Promise<Series> {
    return await this.seriesService.createSeries(data)
  }

  @Delete(':seriesId')
  async deleteTag(@Param() data: DeleteSeriesDto): Promise<ResultMessage> {
    return await this.seriesService.deleteSeries(data)
  }
}
