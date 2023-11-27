import { Controller, Get, UseInterceptors } from '@nestjs/common'
import { ProtectResourceInterceptor } from 'src/shared/interceptors'
import { SeriesService } from '../../services'

@Controller('/admin/series/analytics')
@UseInterceptors(ProtectResourceInterceptor)
export class PrivateSeriesAnalyticsController {
  constructor(private seriesService: SeriesService) {}

  @Get('/published/count')
  async getAllPublishedSeriesCount() {
    return await this.seriesService.getAllPublishedSeriesCount()
  }

  @Get('/unpublished/count')
  async getAllUnPublishedSeriesCount() {
    return await this.seriesService.getAllUnPublishedSeriesCount()
  }

  @Get('/count')
  async getAllSeriesCount() {
    return await this.seriesService.getAllSeriesCount()
  }
}
