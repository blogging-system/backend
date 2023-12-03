import { LoginAttemptRepository } from './login-attempt.repository'
import { InternalServerErrorException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { LoginAttempt } from '../schemas'

describe('LoginAttemptRepository', () => {
  let repository: LoginAttemptRepository

  const mockModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginAttemptRepository,
        {
          provide: getModelToken(LoginAttempt.name),
          useValue: mockModel,
        },
      ],
    }).compile()

    repository = module.get<LoginAttemptRepository>(LoginAttemptRepository)

    mockModel.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([{}]),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('createOne', () => {
    it('should create a login attempt', async () => {
      const expectedResult = {} as LoginAttempt
      mockModel.create.mockResolvedValueOnce(expectedResult)

      const result = await repository.createOne()

      expect(result).toEqual(expectedResult)
      expect(mockModel.create).toHaveBeenCalledWith({})
    })

    it('should throw InternalServerErrorException if login attempt creation fails', async () => {
      mockModel.create.mockRejectedValueOnce(new InternalServerErrorException())

      await expect(repository.createOne()).rejects.toThrow(InternalServerErrorException)
      expect(mockModel.create).toHaveBeenCalledWith({})
    })
  })

  describe('updateOne', () => {
    it('should update a login attempt', async () => {
      const expectedResult = {} as LoginAttempt
      mockModel.findByIdAndUpdate.mockResolvedValueOnce(expectedResult)

      const result = await repository.updateOne('someId')

      expect(result).toEqual(expectedResult)
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('someId', { $inc: { attemptsCount: 1 } }, { new: true })
    })

    it('should throw InternalServerErrorException if login attempt update fails', async () => {
      mockModel.findByIdAndUpdate.mockRejectedValueOnce(new InternalServerErrorException())

      await expect(repository.updateOne('someId')).rejects.toThrow(InternalServerErrorException)
      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('someId', { $inc: { attemptsCount: 1 } }, { new: true })
    })
  })

  describe('findOne', () => {
    it('should find a login attempt', async () => {
      const expectedResult: Partial<LoginAttempt> = {}
      mockModel.find.mockResolvedValueOnce([expectedResult])

      const result = await repository.findOne()

      expect(result).toEqual(expectedResult)
      expect(mockModel.find).toHaveBeenCalledWith()
    })
  })
})
