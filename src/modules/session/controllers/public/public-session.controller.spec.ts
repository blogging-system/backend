import { PublicSessionController } from './public-session.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'
import { RegenerateSessionDto } from '../../dtos'
import { SessionService } from '../../services'
import { Session } from '../../schemas'

describe('🏠PublicSessionController | Controller Layer', () => {
  let publicSessionController: PublicSessionController
  let sessionService: SessionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicSessionController],
      providers: [
        {
          provide: SessionService,
          useValue: {
            regenerateSession: jest.fn(),
          },
        },
      ],
    }).compile()

    publicSessionController = module.get<PublicSessionController>(PublicSessionController)
    sessionService = module.get<SessionService>(SessionService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('regenerateSession method', () => {
    it('should regenerate a session with the provided refresh token', async () => {
      const refreshToken = 'refreshToken123'
      const expectedResult: Partial<Session> = {
        accessToken: '',
        refreshToken: '',
        createdAt: new Date(),
      }

      ;(sessionService.regenerateSession as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await publicSessionController.regenerateSession({ refreshToken } as RegenerateSessionDto)

      expect(sessionService.regenerateSession).toHaveBeenCalledWith(refreshToken)
      expect(result).toEqual(expectedResult)
    })

    it('should throw an error when refresh token is not provided', async () => {
      try {
        await expect(publicSessionController.regenerateSession({} as RegenerateSessionDto))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error when refresh token is empty', async () => {
      try {
        await expect(publicSessionController.regenerateSession({ refreshToken: '' } as RegenerateSessionDto))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error when refresh token is not a string', async () => {
      try {
        await expect(publicSessionController.regenerateSession({ refreshToken: '1sdf23' } as RegenerateSessionDto))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error when refresh token is too short', async () => {
      try {
        await expect(publicSessionController.regenerateSession({ refreshToken: 'abc' } as RegenerateSessionDto))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error when refresh token is too long', async () => {
      const longRefreshToken = 'a'.repeat(10000)
      try {
        await expect(
          publicSessionController.regenerateSession({ refreshToken: longRefreshToken } as RegenerateSessionDto),
        )
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })
  })
})
