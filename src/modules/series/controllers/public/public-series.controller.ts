import { Controller, Get, Param, Query } from '@nestjs/common'
import { Pagination } from 'src/shared/dtos'
import { SeriesService } from '../../services'
import { Series } from '../../schemas'

@Controller('series')
export class PublicSeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get(':slug')
  public async getSeriesBySlug(@Param('slug') slug: string): Promise<Series> {
    const query = { slug, isPublished: true }

    return await this.seriesService.getSeriesBySlug(query)
  }

  @Get()
  public async getAllSeries(@Query() query: Partial<Pagination>): Promise<Series[]> {
    const { tagId, seriesId, keywordId, ...pagination } = query

    return this.seriesService.getAllSeries({ pagination, isPublished: true })
  }
}
