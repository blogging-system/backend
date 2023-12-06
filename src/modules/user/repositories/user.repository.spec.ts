import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { UserRepository } from './user.repository'
import { getModelToken } from '@nestjs/mongoose'
import { HashUtil } from '@src/shared/utils'
import { CreateUserDto } from '../dtos'
import { Model, Types } from 'mongoose'
import { User } from '../schemas'

describe('UserRepository', () => {
  let userRepository: UserRepository
  let userModel: Model<User>

  const mockUserModel = {
    create: jest.fn(),
    findOneByEmail: jest.fn(),
    findOneById: jest.fn(),
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile()

    userRepository = module.get<UserRepository>(UserRepository)
    userModel = module.get<Model<User>>(getModelToken(User.name))

    mockUserModel.findOne.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({}),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Layer Setup', () => {
    it('should be defined', () => {
      expect(userRepository).toBeDefined()
    })
  })

  describe('createOne', () => {
    it('should create a user successfully', async () => {
      const createUserDto: Partial<CreateUserDto> = {}
      const mockUser = {}

      mockUserModel.create.mockResolvedValueOnce(mockUser)

      jest.spyOn(HashUtil, 'generateHash').mockResolvedValueOnce('hashedPassword')
      const result = await userRepository.createOne(createUserDto as CreateUserDto)

      expect(mockUserModel.create).toHaveBeenCalled()
      expect(result).toEqual(mockUser)
    })

    it('should handle a failed user creation and throw an InternalServerErrorException', async () => {
      const createUserDto: Partial<CreateUserDto> = {}

      mockUserModel.create.mockResolvedValueOnce(null)

      jest.spyOn(HashUtil, 'generateHash').mockResolvedValueOnce('hashedPassword')

      await expect(userRepository.createOne(createUserDto as CreateUserDto)).rejects.toThrow(
        InternalServerErrorException,
      )
      expect(mockUserModel.create).toHaveBeenCalled()
    })
  })

  describe('findOneByEmail', () => {
    it('should find a user by email successfully', async () => {
      const email = 'test@example.com'

      await userRepository.findOneByEmail(email)

      expect(mockUserModel.findOne).toHaveBeenCalled()
    })

    it('should handle a user not found by email and throw a NotFoundException', async () => {
      const email = 'nonexistent@example.com'
      mockUserModel.findOne.mockReturnValueOnce(null)

      try {
        await expect(userRepository.findOneByEmail(email))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findOneById', () => {
    it('should find a user by ID successfully', async () => {
      const userId = new Types.ObjectId().toHexString()
      const mockUser = {}

      const result = await userRepository.findOneById(userId)

      expect(mockUserModel.findOne).toHaveBeenCalled()
      expect(result).toEqual(mockUser)
    })

    it('should handle a user not found by ID and throw a NotFoundException', async () => {
      const userId = new Types.ObjectId().toHexString()

      try {
        await expect(userRepository.findOneById(userId))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findOne()', () => {
    it('should find and return a user', async () => {
      await userRepository.findOne({})

      expect(mockUserModel.findOne).toHaveBeenCalled()
    })
  })
})
