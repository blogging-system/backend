import { Test, TestingModule } from "@nestjs/testing";
import { AppService, WelcomeResponse } from "./modules.service";

describe("🏠AppService | Service Layer", () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getHello", () => {
    it("should return a welcome message with author information and links", () => {
      const result: WelcomeResponse = appService.getHello();

      expect(typeof result).toBe("object");
    });
  });

  describe("ping", () => {
    it("should return a successful ping message", () => {
      const result = appService.ping();

      expect(typeof result.message).toBe("string");
    });
  });
});
