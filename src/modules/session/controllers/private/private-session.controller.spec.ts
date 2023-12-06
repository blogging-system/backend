import { PrivateSessionController } from './private-session.controller'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { Test, TestingModule } from '@nestjs/testing'
import { ResultMessage } from '@src/shared/data/types'
import { SessionService } from '../../services'
import { Session } from '../../schemas'
import { Types } from 'mongoose'

describe('🏠PrivateSessionController | Controller Layer', () => {
  let privateSessionController: PrivateSessionController
  let sessionService: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateSessionController],
      providers: [
        {
          provide: SessionService,
          useValue: {
            revokeSession: jest.fn(),
            revokeAllSessions: jest.fn(),
            getAllSessions: jest.fn(),
          },
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile()

    privateSessionController = module.get<PrivateSessionController>(PrivateSessionController)
    sessionService = module.get<SessionService>(SessionService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('revokeSession method', () => {
    it('should revoke a session by sessionId', async () => {
      const sessionId = new Types.ObjectId()
      const expectedResult: ResultMessage = { message: 'Session revoked successfully' }

      ;(sessionService.revokeSession as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSessionController.revokeSession(sessionId)

      expect(sessionService.revokeSession).toHaveBeenCalledWith(sessionId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('revokeAllSession method', () => {
    it('should revoke all sessions for the user', async () => {
      const fakeRequest = {
        session: { accessToken: 'myAccessToken' },
      }
      const expectedResult: ResultMessage = { message: 'All sessions revoked successfully' }

      ;(sessionService.revokeAllSessions as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSessionController.revokeAllSession(fakeRequest as any)

      expect(sessionService.revokeAllSessions).toHaveBeenCalledWith(fakeRequest.session.accessToken)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllSessions method', () => {
    it('should return all sessions', async () => {
      const expectedSessions: Partial<Session>[] = [
        { _id: new Types.ObjectId(), createdAt: new Date() },
        { _id: new Types.ObjectId(), createdAt: new Date() },
      ]

      ;(sessionService.getAllSessions as jest.Mock).mockResolvedValueOnce(expectedSessions)

      const result = await privateSessionController.getAllSessions()

      expect(sessionService.getAllSessions).toHaveBeenCalled()
      expect(result).toEqual(expectedSessions)
    })
  })
})
