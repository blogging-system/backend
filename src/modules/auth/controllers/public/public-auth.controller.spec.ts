import { PublicAuthController } from "./public-auth.controller";
import { AuthService } from "../../services/auth.service";
import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";
import { LoginResponse } from "../../types";
import { LoginDto } from "../../dtos";

describe("🏠PublicAuthController | Controllers layer", () => {
  let publicAuthController: PublicAuthController;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicAuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    publicAuthController = module.get<PublicAuthController>(PublicAuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(publicAuthController).toBeDefined();
  });

  describe("Login functionality", () => {
    it("Should return a successful login response", async () => {
      const loginDto: LoginDto = {
        email: "test@gmail.com",
        password: "myPassword",
      };

      const ipAddress = "127.0.0.1";
      const device = {};

      const expectedLoginResponse: LoginResponse = {
        accessToken: "",
        refreshToken: "",
      };

      (fakeAuthService.login as jest.Mock).mockResolvedValueOnce(expectedLoginResponse);

      const result = await publicAuthController.login(loginDto, ipAddress, device);

      expect(fakeAuthService.login).toHaveBeenCalledWith(loginDto, ipAddress, device);
      expect(result).toEqual(expectedLoginResponse);
    });

    it('should throw an error if the "email" is not found', async () => {
      const emailNotFoundDto: Partial<LoginDto> = {
        email: undefined,
        password: "myPassword",
      };
      try {
        await publicAuthController.login(emailNotFoundDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the "password" is not found', async () => {
      const passwordNotFoundDto: Partial<LoginDto> = {
        email: "test@gmail.com",
        password: undefined,
      };
      try {
        await publicAuthController.login(passwordNotFoundDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the "email" is found but empty', async () => {
      const emptyEmailDto: Partial<LoginDto> = {
        email: "",
        password: "myPassword",
      };
      try {
        await publicAuthController.login(emptyEmailDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the "password" is found but empty', async () => {
      const emptyPasswordDto: Partial<LoginDto> = {
        email: "test@gmail.com",
        password: "",
      };
      try {
        await publicAuthController.login(emptyPasswordDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the "email" is not of type string', async () => {
      const invalidEmailTypeDto: Partial<LoginDto> = {
        email: 123 as any,
        password: "myPassword",
      };
      try {
        await publicAuthController.login(invalidEmailTypeDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the "password" is not of type string', async () => {
      const invalidPasswordTypeDto: Partial<LoginDto> = {
        email: "test@gmail.com",
        password: 123 as any,
      };
      try {
        await publicAuthController.login(invalidPasswordTypeDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw an error if the "email" is shorter than 5 characters', async () => {
      const shortEmailDto: Partial<LoginDto> = {
        email: "a@b.c",
        password: "myPassword",
      };
      try {
        await publicAuthController.login(shortEmailDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toContain("Email must be at least 5 characters long");
      }
    });

    it('should throw an error if the "password" is shorter than 6 characters', async () => {
      const shortPasswordDto: Partial<LoginDto> = {
        email: "test@example.com",
        password: "pass",
      };
      try {
        await publicAuthController.login(shortPasswordDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toContain("Password must be at least 6 characters long");
      }
    });

    it('should throw an error if the "email" is longer than 50 characters', async () => {
      const longEmailDto: Partial<LoginDto> = {
        email: `${"1".repeat(40)}@example.com`,
        password: "myPassword",
      };
      try {
        await publicAuthController.login(longEmailDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toContain("Email cannot be longer than 50 characters");
      }
    });

    it('should throw an error if the "password" is longer than 20 characters', async () => {
      const longPasswordDto: Partial<LoginDto> = {
        email: "test@example.com",
        password: "s".repeat(50),
      };
      try {
        await publicAuthController.login(longPasswordDto as any, "127.0.0.1", {});
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toContain("Password cannot be longer than 20 characters");
      }
    });
  });
});
