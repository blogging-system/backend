import { SessionService } from '@src/modules/session/services'
import { LoginAttemptService } from '../login-attempt.service'
import { UserService } from '@src/modules/user/services'
import { HashUtil, TokenUtil } from '@src/shared/utils'
import { UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../auth.service'

describe('🏠AuthService | Service Layer', () => {
  let authService: Partial<AuthService>
  let userService: Partial<UserService>
  let sessionService: Partial<SessionService>
  let loginAttemptService: Partial<LoginAttemptService>

  beforeEach(async () => {
    userService = {
      findUserByEmail: jest.fn(),
    }

    sessionService = {
      createSession: jest.fn(),
      getSession: jest.fn(),
      deleteSession: jest.fn(),
    }

    loginAttemptService = {
      isFailedLoginAttemptsExceeded: jest.fn(),
      incrementFailedLoginAttemptsCount: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: SessionService, useValue: sessionService },
        { provide: LoginAttemptService, useValue: loginAttemptService },
        HashUtil,
        TokenUtil,
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('login method', () => {
    it('should throw UnauthorizedException for invalid email', async () => {
      userService.findUserByEmail = jest.fn().mockResolvedValueOnce(null)

      await expect(
        authService.login({ email: 'email@example.com', password: 'password123' }, '127.0.0.1', {}),
      ).rejects.toThrow(UnauthorizedException)

      expect(loginAttemptService.incrementFailedLoginAttemptsCount).toHaveBeenCalled()
      expect(loginAttemptService.isFailedLoginAttemptsExceeded).toHaveBeenCalled()
    })

    it('should throw UnauthorizedException for invalid password', async () => {
      userService.findUserByEmail = jest.fn().mockResolvedValueOnce({
        _id: 'user_id',
        email: 'existent@example.com',
        password: 'hashedPassword',
      })

      HashUtil.verifyHash = jest.fn().mockResolvedValueOnce(false)

      await expect(
        authService.login({ email: 'existent@example.com', password: 'incorrectPassword' }, '127.0.0.1', {}),
      ).rejects.toThrow(UnauthorizedException)

      expect(loginAttemptService.incrementFailedLoginAttemptsCount).toHaveBeenCalled()
      expect(loginAttemptService.isFailedLoginAttemptsExceeded).toHaveBeenCalled()
    })

    it('should generate tokens and create session for valid credentials', async () => {
      userService.findUserByEmail = jest.fn().mockResolvedValueOnce({
        _id: 'user_id',
        email: 'existent@example.com',
        password: 'hashedPassword',
      })

      HashUtil.verifyHash = jest.fn().mockResolvedValueOnce(true)

      TokenUtil.generateAccessToken = jest.fn().mockResolvedValueOnce('accessToken')
      TokenUtil.generateRefreshToken = jest.fn().mockResolvedValueOnce('refreshToken')

      const createSessionSpy = jest.spyOn(sessionService, 'createSession')

      const result = await authService.login(
        { email: 'existent@example.com', password: 'correctPassword' },
        '127.0.0.1',
        {},
      )

      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      })
      expect(createSessionSpy).toHaveBeenCalledWith({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        ipAddress: '127.0.0.1',
        device: {},
      })
      expect(loginAttemptService.isFailedLoginAttemptsExceeded).toHaveBeenCalled()
      expect(loginAttemptService.incrementFailedLoginAttemptsCount).not.toHaveBeenCalled()
    })
  })

  describe('logOut method', () => {
    it('should delete session for valid accessToken', async () => {
      sessionService.getSession = jest.fn().mockResolvedValueOnce({
        _id: 'session_id',
      })

      const deleteSessionSpy = jest.spyOn(sessionService, 'deleteSession')

      await authService.logOut('validAccessToken')

      expect(deleteSessionSpy).toHaveBeenCalledWith('session_id')
    })
  })
})
