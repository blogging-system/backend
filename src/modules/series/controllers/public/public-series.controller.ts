import { Controller, Get, Param, Query } from '@nestjs/common'
import { SeriesService } from '../../services'
import { Pagination } from '@src/shared/contracts/dtos'
import { GetSeriesBySlug } from '../../dtos'
import { Series } from '../../schemas'

@Controller('series')
export class PublicSeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get(':slug')
  public getSeriesBySlug(@Param() { slug }: GetSeriesBySlug): Promise<Series> {
    const query = { slug, isPublished: true }

    return this.seriesService.getSeriesBySlug(query)
  }

  @Get()
  public getAllSeries(@Query() query: Partial<Pagination>): Promise<Series[]> {
    const { tagId, seriesId, keywordId, ...pagination } = query

    return this.seriesService.getAllSeries({ pagination, isPublished: true })
  }
}
