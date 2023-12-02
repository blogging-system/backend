import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from '../../repositories'
import { UserService } from '../user.service'
import { CreateUserDto } from '../../dtos'
import { User } from '../../schemas'

describe('🏠UserService | Service Layer', () => {
  let userService: UserService
  let userRepository: UserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createOne: jest.fn(),
            findOneByEmail: jest.fn(),
            findOneById: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser method', () => {
    it('should create a user successfully', async () => {
      const createUserDto: Partial<CreateUserDto> = { email: 'test@example.com', password: 'password' }
      const mockUser: Partial<User> = { _id: 'someUserId', ...createUserDto }

      userRepository.createOne = jest.fn().mockResolvedValueOnce(mockUser)

      const result = await userService.createUser(createUserDto as CreateUserDto)

      expect(result).toEqual(mockUser)
      expect(userRepository.createOne).toHaveBeenCalledWith(createUserDto)
    })
  })

  describe('findUserByEmail method', () => {
    it('should find a user by email successfully', async () => {
      const email = 'test@example.com'
      const mockUser: Partial<User> = { _id: 'someUserId', email, password: 'password' }

      userRepository.findOneByEmail = jest.fn().mockResolvedValueOnce(mockUser)

      const result = await userService.findUserByEmail(email)

      expect(result).toEqual(mockUser)
      expect(userRepository.findOneByEmail).toHaveBeenCalledWith(email)
    })
  })

  describe('findUserById method', () => {
    it('should find a user by ID successfully', async () => {
      const userId = 'someUserId'
      const mockUser: Partial<User> = { _id: userId, email: 'test@example.com', password: 'password' }

      userRepository.findOneById = jest.fn().mockResolvedValueOnce(mockUser)

      const result = await userService.findUserById(userId)

      expect(result).toEqual(mockUser)
      expect(userRepository.findOneById).toHaveBeenCalledWith(userId)
    })
  })

  describe('findRootUser method', () => {
    it('should find the root user successfully', async () => {
      const mockUser: Partial<User> = { _id: 'someUserId', email: 'test@example.com', password: 'password' }

      userRepository.findOne = jest.fn().mockResolvedValueOnce(mockUser)

      const result = await userService.findRootUser()

      expect(result).toEqual(mockUser)
      expect(userRepository.findOne).toHaveBeenCalledWith({})
    })
  })

  describe('isUserFound method', () => {
    it('should return true if the user is found', async () => {
      const email = 'test@example.com'

      userRepository.findOne = jest.fn().mockResolvedValueOnce({ _id: 'someUserId', email, password: 'password' })

      const result = await userService.isUserFound(email)

      expect(result).toBe(true)
      expect(userRepository.findOne).toHaveBeenCalledWith({ email })
    })

    it('should return false if the user is not found', async () => {
      const email = 'nonexistent@example.com'

      userRepository.findOne = jest.fn().mockResolvedValueOnce(null)

      const result = await userService.isUserFound(email)

      expect(result).toBe(false)
      expect(userRepository.findOne).toHaveBeenCalledWith({ email })
    })
  })
})
