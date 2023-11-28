import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { CreateSeriesDto, DeleteSeriesDto } from '../../dtos'
import { ResultMessage } from 'src/shared/types'
import { SeriesService } from '../../services'
import { Pagination } from 'src/shared/dtos'
import { Series } from '../../schemas'

@Controller('/admin/series')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateSeriesCoreController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  public async createSeries(@Body() data: CreateSeriesDto): Promise<Series> {
    return await this.seriesService.createSeries(data)
  }

  @Patch(':seriesId')
  public async updateSeries(@Param('seriesId') seriesId: string, @Body() payload: CreateSeriesDto): Promise<Series> {
    return await this.seriesService.updateSeries(seriesId, payload)
  }

  @Delete(':seriesId')
  public async deleteSeries(@Param() data: DeleteSeriesDto): Promise<ResultMessage> {
    return await this.seriesService.deleteSeries(data)
  }

  @Post('/publish/:seriesId')
  public async publishSeries(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return await this.seriesService.publishSeries(seriesId)
  }

  @Post('/unpublish/:seriesId')
  public async unPublishSeries(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return await this.seriesService.unPublishSeries(seriesId)
  }

  @Get('/latest')
  public async getLatestSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getLatestSeries({ pagination, isPublished: true })
  }

  @Get('/published')
  public async getPublishedSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getPublishedSeries({ pagination })
  }

  @Get('/unpublished')
  public async getUnPublishedSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getUnPublishedSeries({ pagination })
  }

  @Get('/popular')
  public async getPopularSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getPopularSeries({ pagination })
  }

  @Get('/unpopular')
  public async getUnPopularSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getUnPopularSeries({ pagination })
  }

  @Get('/trending')
  public async getTrendingSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getTrendingSeries({ pagination })
  }

  @Get(':slug')
  public async getSeriesBySlug(@Param('slug') slug: string): Promise<Series> {
    return await this.seriesService.getSeriesBySlug({ slug })
  }

  @Get()
  public async getAllSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getAllSeries({ pagination, sortValue: pagination.sort })
  }
}
