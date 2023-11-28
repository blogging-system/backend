import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { SeriesService } from '../../services'

@Controller('/admin/series/analytics')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateSeriesAnalyticsController {
  constructor(private seriesService: SeriesService) {}

  @Get('/published/count')
  public getAllPublishedSeriesCount() {
    return this.seriesService.getAllPublishedSeriesCount()
  }

  @Get('/unpublished/count')
  public getAllUnPublishedSeriesCount() {
    return this.seriesService.getAllUnPublishedSeriesCount()
  }

  @Get('/count')
  public getAllSeriesCount() {
    return this.seriesService.getAllSeriesCount()
  }
}
