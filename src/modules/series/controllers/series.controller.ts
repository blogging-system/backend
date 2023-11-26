import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreateSeriesDto, DeleteSeriesDto } from '../dtos'
import { ResultMessage } from 'src/shared/types'
import { SeriesService } from '../services'
import { Series } from '../schemas'
import { Pagination } from 'src/shared/dtos'

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  async createTag(@Body() data: CreateSeriesDto): Promise<Series> {
    return await this.seriesService.createSeries(data)
  }

  @Patch(':seriesId')
  async updatePost(@Param('seriesId') seriesId: string, @Body() payload: CreateSeriesDto): Promise<Series> {
    return await this.seriesService.updateSeries(seriesId, payload)
  }

  @Delete(':seriesId')
  async deleteTag(@Param() data: DeleteSeriesDto): Promise<ResultMessage> {
    return await this.seriesService.deleteSeries(data)
  }

  @Post('/publish/:seriesId')
  async publishSeries(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return await this.seriesService.publishSeries(seriesId)
  }

  @Post('/unpublish/:seriesId')
  async unPublishSeries(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return await this.seriesService.unPublishSeries(seriesId)
  }

  @Get(':slug')
  async getSeriesBySlug(@Param('slug') slug: string): Promise<Series> {
    return await this.seriesService.getSeriesBySlug(slug)
  }

  @Get()
  async getAllSeries(@Query() query: Pagination): Promise<Series[]> {
    return this.seriesService.getAllSeries(query as Pagination)
  }
}
