import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user.service";
import { UserSeederService } from "../user-seeder.service";
import { CreateUserDto } from "../../dtos";

describe("🏠UserSeederService | Service Layer", () => {
  let userSeederService: UserSeederService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSeederService,
        {
          provide: UserService,
          useValue: {
            isUserFound: jest.fn(),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    userSeederService = module.get<UserSeederService>(UserSeederService);
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("seedRootUser method", () => {
    it("should seed root user successfully if user is not found", async () => {
      const createUserDto: Partial<CreateUserDto> = { email: "test@example.com", password: "password" };

      (userService.isUserFound as jest.Mock).mockResolvedValueOnce(false);

      await userSeederService.seedRootUser(createUserDto as CreateUserDto);

      expect(userService.isUserFound).toHaveBeenCalledWith(createUserDto.email);
      expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it("should not seed root user if user is found", async () => {
      const createUserDto: Partial<CreateUserDto> = { email: "test@example.com", password: "password" };

      (userService.isUserFound as jest.Mock).mockResolvedValueOnce(true);

      await userSeederService.seedRootUser(createUserDto as CreateUserDto);

      expect(userService.isUserFound).toHaveBeenCalledWith(createUserDto.email);
      expect(userService.createUser).not.toHaveBeenCalled();
    });
  });
});
