import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { CreateSeriesDto, DeleteSeriesDto } from '../../dtos'
import { ResultMessage } from 'src/shared/types'
import { Pagination } from 'src/shared/dtos'
import { SeriesService } from '../../services'
import { Series } from '../../schemas'

@Controller('/admin/series')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateSeriesCoreController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  async createSeries(@Body() data: CreateSeriesDto): Promise<Series> {
    return await this.seriesService.createSeries(data)
  }

  @Patch(':seriesId')
  async updateSeries(@Param('seriesId') seriesId: string, @Body() payload: CreateSeriesDto): Promise<Series> {
    return await this.seriesService.updateSeries(seriesId, payload)
  }

  @Delete(':seriesId')
  async deleteSeries(@Param() data: DeleteSeriesDto): Promise<ResultMessage> {
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
    return await this.seriesService.getSeriesBySlug({ slug })
  }

  @Get()
  async getAllSeries(@Query() query: Pagination): Promise<Series[]> {
    return this.seriesService.getAllSeries({ pagination: query })
  }
}
