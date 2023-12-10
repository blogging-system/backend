import { AccountVerificationInterceptor } from "@src/shared/interceptors/is-verified.interceptor";
import { ProtectResourceInterceptor } from "@src/shared/interceptors";
import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ResultMessage } from "@src/shared/contracts/types";
import { SeriesService } from "../../services";

@Controller("/admin/series/analytics")
@UseInterceptors(ProtectResourceInterceptor, AccountVerificationInterceptor)
export class PrivateSeriesAnalyticsController {
  constructor(private seriesService: SeriesService) {}

  @Get("/published/count")
  public getAllPublishedSeriesCount(): Promise<ResultMessage> {
    return this.seriesService.getAllPublishedSeriesCount();
  }

  @Get("/unpublished/count")
  public getAllUnPublishedSeriesCount(): Promise<ResultMessage> {
    return this.seriesService.getAllUnPublishedSeriesCount();
  }

  @Get("/count")
  public getAllSeriesCount(): Promise<ResultMessage> {
    return this.seriesService.getAllSeriesCount();
  }
}
