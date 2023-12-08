import { PrivateSeriesAnalyticsController } from "../private-series-analytics.controller";
import { ProtectResourceInterceptor } from "@src/shared/interceptors";
import { SeriesService } from "@src/modules/series/services";
import { Test, TestingModule } from "@nestjs/testing";
import { ResultMessage } from "@src/shared/contracts/types";

describe("🏠PrivateSeriesAnalyticsController | Controller Layer", () => {
  let privateSeriesAnalyticsController: PrivateSeriesAnalyticsController;
  let seriesService: SeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateSeriesAnalyticsController],
      providers: [
        {
          provide: SeriesService,
          useValue: {
            getAllPublishedSeriesCount: jest.fn(),
            getAllUnPublishedSeriesCount: jest.fn(),
            getAllSeriesCount: jest.fn(),
          },
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile();

    privateSeriesAnalyticsController = module.get<PrivateSeriesAnalyticsController>(PrivateSeriesAnalyticsController);
    seriesService = module.get<SeriesService>(SeriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPublishedSeriesCount method", () => {
    it("should return the count of all published series", async () => {
      const expectedResult: ResultMessage = { message: "Count of published series: 10" };

      (seriesService.getAllPublishedSeriesCount as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privateSeriesAnalyticsController.getAllPublishedSeriesCount();

      expect(seriesService.getAllPublishedSeriesCount).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getAllUnPublishedSeriesCount method", () => {
    it("should return the count of all unpublished series", async () => {
      const expectedResult: ResultMessage = { message: "Count of unpublished series: 5" };

      (seriesService.getAllUnPublishedSeriesCount as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privateSeriesAnalyticsController.getAllUnPublishedSeriesCount();

      expect(seriesService.getAllUnPublishedSeriesCount).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe("getAllSeriesCount method", () => {
    it("should return the total count of all series", async () => {
      const expectedResult: ResultMessage = { message: "Total count of series: 15" };

      (seriesService.getAllSeriesCount as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await privateSeriesAnalyticsController.getAllSeriesCount();

      expect(seriesService.getAllSeriesCount).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
