import { PublicQuoteController } from "./public-quote.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { QuoteService } from "../../services";

describe("🏠PublicQuoteController | Controller Layer", () => {
  let publicQuoteController: PublicQuoteController;
  let quoteService: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicQuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: {
            getRandomQuotes: jest.fn(),
          },
        },
      ],
    }).compile();

    publicQuoteController = module.get<PublicQuoteController>(PublicQuoteController);
    quoteService = module.get<QuoteService>(QuoteService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRandomQuotes method", () => {
    it("should return random quotes", async () => {
      const expectedResult: {}[] = [
        { _id: "1", text: "Quote 1" },
        { _id: "2", text: "Quote 2" },
      ];

      (quoteService.getRandomQuotes as jest.Mock).mockResolvedValueOnce(expectedResult);

      const result = await publicQuoteController.getRandomQuotes();

      expect(quoteService.getRandomQuotes).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});
