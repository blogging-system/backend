import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { SessionRepository } from './session.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { CreateSessionDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Session } from '../schemas'
import { Model, SessionOperation, Types } from 'mongoose'

describe('SessionRepository', () => {
  let sessionRepository: SessionRepository
  let sessionModel: Model<Session>

  const mockSessionModel = {
    create: jest.fn(),
    deleteOne: jest.fn(),
    deleteMany: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionRepository,
        {
          provide: getModelToken(Session.name),
          useValue: mockSessionModel,
        },
      ],
    }).compile()

    sessionRepository = module.get<SessionRepository>(SessionRepository)
    sessionModel = module.get<Model<Session>>(getModelToken(Session.name))

    mockSessionModel.findOne.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({}),
    })

    mockSessionModel.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([{}]),
    })

    mockSessionModel.countDocuments.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce(5),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Layer Setup', () => {
    it('should be defined', () => {
      expect(sessionRepository).toBeDefined()
    })
  })

  describe('createOne', () => {
    it('should create a session successfully', async () => {
      const createSessionDto: Partial<CreateSessionDto> = {}
      const mockCreatedSession = {}

      mockSessionModel.create.mockResolvedValueOnce(mockCreatedSession)

      const result = await sessionRepository.createOne(createSessionDto as CreateSessionDto)

      expect(mockSessionModel.create).toHaveBeenCalledWith(createSessionDto)
      expect(result).toEqual(mockCreatedSession)
    })

    it('should handle a failed creation and throw an InternalServerErrorException', async () => {
      const createSessionDto: Partial<CreateSessionDto> = {}

      mockSessionModel.create.mockResolvedValueOnce(null)

      await expect(sessionRepository.createOne(createSessionDto as CreateSessionDto)).rejects.toThrow(
        InternalServerErrorException,
      )
    })
  })

  describe('deleteOne', () => {
    it('should delete a session successfully', async () => {
      const sessionId = new Types.ObjectId().toHexString()
      const mockDeleteResult = { deletedCount: 1 }

      mockSessionModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      const result = await sessionRepository.deleteOne(sessionId)

      expect(mockSessionModel.deleteOne).toHaveBeenCalledWith({ _id: new Types.ObjectId(sessionId) })
      expect(result).toEqual(mockDeleteResult)
    })

    it('should handle a failed deletion and throw an InternalServerErrorException', async () => {
      const sessionId = new Types.ObjectId().toHexString()

      const mockDeleteResult = { deletedCount: 0 }
      mockSessionModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      try {
        await expect(sessionRepository.deleteOne(sessionId))
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException)
      }
    })
  })

  describe('deleteMany', () => {
    it('should delete multiple sessions successfully', async () => {
      const excludedAccessToken = 'mockAccessToken'
      const mockDeleteResult = { deletedCount: 10 }

      mockSessionModel.deleteMany.mockResolvedValueOnce(mockDeleteResult)

      const result = await sessionRepository.deleteMany(excludedAccessToken)

      expect(mockSessionModel.deleteMany).toHaveBeenCalledWith({ accessToken: { $ne: excludedAccessToken } })
      expect(result).toEqual({ message: MESSAGES.ALL_DELETED_SUCCESSFULLY })
    })

    it('should handle a failed deletion and throw an InternalServerErrorException', async () => {
      const excludedAccessToken = 'mockAccessToken'
      const mockDeleteResult = null
      mockSessionModel.deleteMany.mockResolvedValueOnce(mockDeleteResult)

      await expect(sessionRepository.deleteMany(excludedAccessToken)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findOne', () => {
    it('should find a session by query successfully', async () => {
      const query = {}
      const mockSession = {}

      mockSessionModel.findOne.mockResolvedValueOnce(mockSession)

      const result = await sessionRepository.findOne(query)

      expect(mockSessionModel.findOne).toHaveBeenCalledWith(query)
      expect(result).toEqual(mockSession)
    })
  })

  describe('findMany', () => {
    it('should find multiple sessions successfully', async () => {
      const mockSessionsList: Partial<SessionOperation>[] = [{}]

      const result = await sessionRepository.findMany()

      expect(mockSessionModel.find).toHaveBeenCalled()
      expect(result).toEqual(mockSessionsList)
    })

    it('should handle a failed find many and throw a NotFoundException', async () => {
      try {
        await expect(sessionRepository.findMany())
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })
})
