import { LoginAttemptService } from "../login-attempt.service";
import { LoginAttemptRepository } from "../../repositories";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { LoginAttempt } from "../../schemas";
import { MESSAGES } from "../../constants";

describe("LoginAttemptService", () => {
  let loginAttemptService: LoginAttemptService;
  let loginAttemptRepository: Partial<LoginAttemptRepository>;

  loginAttemptRepository = {
    createOne: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginAttemptService,
        {
          provide: LoginAttemptRepository,
          useValue: loginAttemptRepository,
        },
      ],
    }).compile();

    loginAttemptService = module.get<LoginAttemptService>(LoginAttemptService);
    loginAttemptRepository = module.get<LoginAttemptRepository>(LoginAttemptRepository);
  });

  describe("createLoginAttempt", () => {
    it("should create a login attempt", async () => {
      const mockLoginAttempt: LoginAttempt = { _id: "mockId", attemptsCount: 1, createdAt: new Date() };

      loginAttemptRepository.createOne = jest.fn().mockResolvedValueOnce(mockLoginAttempt);

      const result = await loginAttemptService.createLoginAttempt();

      expect(result).toEqual(mockLoginAttempt);
      expect(loginAttemptRepository.createOne).toHaveBeenCalled();
    });
  });

  describe("incrementFailedLoginAttemptsCount", () => {
    it("should increment login attempts count when attempt exists", async () => {
      const mockExistingAttempt: LoginAttempt = { _id: "mockId", attemptsCount: 2, createdAt: new Date() };

      loginAttemptRepository.findOne = jest.fn().mockResolvedValueOnce(mockExistingAttempt);
      loginAttemptRepository.updateOne = jest.fn().mockResolvedValueOnce(mockExistingAttempt);

      const result = await loginAttemptService.incrementFailedLoginAttemptsCount();

      expect(result).toEqual(mockExistingAttempt);
      expect(loginAttemptRepository.findOne).toHaveBeenCalled();
      expect(loginAttemptRepository.updateOne).toHaveBeenCalledWith(mockExistingAttempt._id);
    });

    it("should create a new login attempt when attempt does not exist", async () => {
      const mockNewAttempt: LoginAttempt = { _id: "newMockId", attemptsCount: 1, createdAt: new Date() };

      loginAttemptRepository.findOne = jest.fn().mockResolvedValueOnce(null);
      loginAttemptRepository.createOne = jest.fn().mockResolvedValueOnce(mockNewAttempt);

      const result = await loginAttemptService.incrementFailedLoginAttemptsCount();

      expect(result).toEqual(mockNewAttempt);
      expect(loginAttemptRepository.findOne).toHaveBeenCalled();
      expect(loginAttemptRepository.createOne).toHaveBeenCalled();
    });
  });

  describe("isFailedLoginAttemptsExceeded", () => {
    it("should throw TOO_MANY_REQUESTS exception when attempts count exceeds limit", async () => {
      const mockExceededAttempt: LoginAttempt = { _id: "mockId", attemptsCount: 5, createdAt: new Date() };

      loginAttemptRepository.findOne = jest.fn().mockResolvedValueOnce(mockExceededAttempt);

      await expect(loginAttemptService.isFailedLoginAttemptsExceeded()).rejects.toThrow(
        new HttpException(MESSAGES.TOO_MANY_REQUESTS, HttpStatus.TOO_MANY_REQUESTS),
      );

      expect(loginAttemptRepository.findOne).toHaveBeenCalled();
    });

    it("should return false when attempts count does not exceed limit", async () => {
      const mockNotExceededAttempt: LoginAttempt = { _id: "mockId", attemptsCount: 3, createdAt: new Date() };
      loginAttemptRepository.findOne = jest.fn().mockResolvedValueOnce(mockNotExceededAttempt);

      const result = await loginAttemptService.isFailedLoginAttemptsExceeded();

      expect(result).toBe(false);
      expect(loginAttemptRepository.findOne).toHaveBeenCalled();
    });
  });
});
