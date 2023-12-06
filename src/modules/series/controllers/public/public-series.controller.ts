import { Controller, Get, Param, Query } from '@nestjs/common'
import { SeriesService } from '../../services'
import { Pagination } from '@src/shared/contracts/dtos'
import { GetSeriesBySlug } from '../../dtos'
import { Series } from '../../schemas'
import { FilterPostDto } from '@src/modules/post/dtos'
import { FilterSeriesDto } from '../../dtos/filter-series.dto'

@Controller('series')
export class PublicSeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get(':slug')
  public getSeriesBySlug(@Param() { slug }: GetSeriesBySlug): Promise<Series> {
    const query = { slug, isPublished: true }

    return this.seriesService.getSeriesBySlug(query)
  }

  // @Get()
  // public getAllSeries(@Query() { tagId, ...pagination }: Pagination & FilterSeriesDto): Promise<Series[]> {
  //   return this.seriesService.getAllSeries({ pagination, tagId, isPublished: true })
  // }
}
