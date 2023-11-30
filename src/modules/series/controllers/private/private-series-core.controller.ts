import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { CreateSeriesDto, DeleteSeriesDto } from '../../dtos'
import { ResultMessage } from '@src/shared/types'
import { SeriesService } from '../../services'
import { Pagination } from '@src/shared/dtos'
import { Series } from '../../schemas'

@Controller('/admin/series')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateSeriesCoreController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  public createSeries(@Body() data: CreateSeriesDto): Promise<Series> {
    return this.seriesService.createSeries(data)
  }

  @Patch(':seriesId')
  public updateSeries(@Param('seriesId') seriesId: string, @Body() payload: CreateSeriesDto): Promise<Series> {
    return this.seriesService.updateSeries(seriesId, payload)
  }

  @Delete(':seriesId')
  public deleteSeries(@Param() data: DeleteSeriesDto): Promise<ResultMessage> {
    return this.seriesService.deleteSeries(data)
  }

  @Post('/publish/:seriesId')
  public publishSeries(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return this.seriesService.publishSeries(seriesId)
  }

  @Post('/unpublish/:seriesId')
  public unPublishSeries(@Param('seriesId') seriesId: string): Promise<ResultMessage> {
    return this.seriesService.unPublishSeries(seriesId)
  }

  @Get('/latest')
  public getLatestSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getLatestSeries({ pagination, isPublished: true })
  }

  @Get('/published')
  public getPublishedSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getPublishedSeries({ pagination })
  }

  @Get('/unpublished')
  public getUnPublishedSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getUnPublishedSeries({ pagination })
  }

  @Get('/popular')
  public getPopularSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getPopularSeries({ pagination })
  }

  @Get('/unpopular')
  public getUnPopularSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getUnPopularSeries({ pagination })
  }

  @Get('/trending')
  public getTrendingSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getTrendingSeries({ pagination })
  }

  @Get(':slug')
  public getSeriesBySlug(@Param('slug') slug: string): Promise<Series> {
    return this.seriesService.getSeriesBySlug({ slug })
  }

  @Get()
  public getAllSeries(@Query() pagination: Pagination): Promise<Series[]> {
    return this.seriesService.getAllSeries({ pagination, sortValue: pagination.sort })
  }
}
