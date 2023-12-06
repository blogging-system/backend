import { InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { MESSAGES as AUTH_MESSAGES } from '../../auth/constants'
import { Test, TestingModule } from '@nestjs/testing'
import { SessionRepository } from '../repositories'
import { SessionService } from './session.service'
import { UserService } from '../../user/services'
import { ResultMessage } from '@src/shared/contracts/types'
import { User } from '@src/modules/user/schemas'
import { TokenUtil } from '@src/shared/utils'
import { CreateSessionDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Session } from '../schemas'

describe('🏠SessionService | Service Layer', () => {
  let sessionService: SessionService
  let userService: Partial<UserService>
  let sessionRepository: Partial<SessionRepository>

  beforeEach(async () => {
    sessionRepository = {
      createOne: jest.fn(),
      deleteOne: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
    }

    userService = {
      findRootUser: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: SessionRepository,
          useValue: sessionRepository,
        },
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile()

    sessionService = module.get<SessionService>(SessionService)
    sessionRepository = module.get<SessionRepository>(SessionRepository)
    userService = module.get<UserService>(UserService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createSession method', () => {
    it('should create a session successfully', async () => {
      const createSessionDto: Partial<CreateSessionDto> = {}
      const mockSession: Partial<Session> = {}

      jest.spyOn(sessionRepository, 'createOne').mockResolvedValueOnce(mockSession as Session)

      const result = await sessionService.createSession(createSessionDto as CreateSessionDto)

      expect(result).toEqual(mockSession)
      expect(sessionRepository.createOne).toHaveBeenCalledWith(createSessionDto)
    })
  })

  describe('regenerateSession method', () => {
    it('should regenerate a session successfully', async () => {
      const refreshToken = 'someRefreshToken'
      const mockSession: Partial<Session> = { _id: 'someSessionId', device: {}, ipAddress: 'someIpAddress' }
      const mockUser = { _id: 'someUserId' }

      jest.spyOn(sessionService, 'getSession').mockResolvedValueOnce(mockSession as Session)
      jest.spyOn(sessionService, 'revokeSession').mockResolvedValueOnce({})
      jest.spyOn(userService, 'findRootUser').mockResolvedValueOnce(mockUser as User)

      jest.spyOn(TokenUtil, 'generateAccessToken').mockResolvedValueOnce('someAccessToken' as never)
      jest.spyOn(TokenUtil, 'generateRefreshToken').mockResolvedValueOnce('someNewRefreshToken' as never)

      jest.spyOn(sessionRepository, 'createOne').mockResolvedValueOnce(mockSession as Session)

      const result = await sessionService.regenerateSession(refreshToken)

      expect(result).toEqual(mockSession as Session)
      expect(sessionService.getSession).toHaveBeenCalledWith({ refreshToken })
      expect(sessionService.revokeSession).toHaveBeenCalledWith(mockSession._id)
      expect(userService.findRootUser).toHaveBeenCalled()
      expect(TokenUtil.generateAccessToken).toHaveBeenCalledWith({ _id: mockUser._id })
      expect(TokenUtil.generateRefreshToken).toHaveBeenCalledWith({ _id: mockUser._id })
      expect(sessionRepository.createOne).toHaveBeenCalledWith({
        device: mockSession.device,
        ipAddress: mockSession.ipAddress,
        accessToken: 'someAccessToken',
        refreshToken: 'someNewRefreshToken',
      })
    })
  })

  describe('revokeSession method', () => {
    it('should revoke a session successfully', async () => {
      const sessionId = 'someSessionId'
      const mockResult: ResultMessage = { message: MESSAGES.REVOKED_SUCCESSFULLY }

      jest.spyOn(sessionRepository, 'deleteOne').mockResolvedValueOnce({ deletedCount: 1 })

      const result = await sessionService.revokeSession(sessionId)

      expect(result).toEqual(mockResult)
      expect(sessionRepository.deleteOne).toHaveBeenCalledWith(sessionId)
    })

    it('should throw InternalServerErrorException if session deletion fails', async () => {
      const sessionId = 'someSessionId'

      jest.spyOn(sessionRepository, 'deleteOne').mockResolvedValueOnce({ deletedCount: 0 })

      await expect(sessionService.revokeSession(sessionId)).rejects.toThrow(InternalServerErrorException)
      expect(sessionRepository.deleteOne).toHaveBeenCalledWith(sessionId)
    })
  })

  describe('deleteSession method', () => {
    it('should delete a session successfully', async () => {
      const sessionId = 'someSessionId'
      const mockResult: ResultMessage = { message: AUTH_MESSAGES.LOGGED_OUT_SUCCESSFULLY }

      jest.spyOn(sessionRepository, 'deleteOne').mockResolvedValueOnce({ deletedCount: 1 })

      const result = await sessionService.revokeSession(sessionId)

      expect(result).toEqual(mockResult)
      expect(sessionRepository.deleteOne).toHaveBeenCalledWith(sessionId)
    })

    it('should throw InternalServerErrorException if session deletion fails', async () => {
      const sessionId = 'someSessionId'

      jest.spyOn(sessionRepository, 'deleteOne').mockResolvedValueOnce({} as Partial<Session>)

      await expect(sessionService.revokeSession(sessionId)).rejects.toThrow(InternalServerErrorException)
      expect(sessionRepository.deleteOne).toHaveBeenCalledWith(sessionId)
    })
  })

  describe('revokeAllSessions method', () => {
    it('should revoke all sessions successfully', async () => {
      const excludedAccessToken = 'someAccessToken'
      const mockResult: ResultMessage = {
        /* provide expected result data */
      }

      jest.spyOn(sessionRepository, 'delete').mockResolvedValueOnce(mockResult)

      const result = await sessionService.revokeAllSessions(excludedAccessToken)

      expect(result).toEqual(mockResult)
      expect(sessionRepository.delete).toHaveBeenCalledWith(excludedAccessToken)
    })
  })

  describe('getSession method', () => {
    it('should get a session successfully', async () => {
      const getSessionDto = { sessionId: 'someSessionId' }
      const mockSession: Partial<Session> = {}

      jest.spyOn(sessionRepository, 'findOne').mockResolvedValueOnce(mockSession as Session)

      const result = await sessionService.getSession(getSessionDto)

      expect(result).toEqual(mockSession)
      expect(sessionRepository.findOne).toHaveBeenCalledWith(getSessionDto)
    })

    it('should throw UnauthorizedException if session is not found', async () => {
      const getSessionDto = { sessionId: 'nonExistentSessionId' }

      jest.spyOn(sessionRepository, 'findOne').mockResolvedValueOnce(null)

      await expect(sessionService.getSession(getSessionDto)).rejects.toThrow(UnauthorizedException)
      expect(sessionRepository.findOne).toHaveBeenCalledWith(getSessionDto)
    })
  })

  describe('getAllSessions method', () => {
    it('should get all sessions successfully', async () => {
      const mockSessions: Partial<Session>[] = [{}, {}]

      jest.spyOn(sessionRepository, 'find').mockResolvedValueOnce(mockSessions as Session[])

      const result = await sessionService.getAllSessions()

      expect(result).toEqual(mockSessions as Session[])
      expect(sessionRepository.find).toHaveBeenCalled()
    })
  })
})
