import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { PrivateAuthController } from './private-auth.controller'
import { UserService } from '../../../user/services/user.service'
import { AuthService } from '../../services/auth.service'
import { User } from '../../../user/schemas/user.schema'
import { Test, TestingModule } from '@nestjs/testing'
import { Types } from 'mongoose'

describe('🏠PrivateAuthController | Controllers Layer', () => {
  let privateAuthController: PrivateAuthController
  let fakeUserService: Partial<UserService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUserService = {
      findUserById: jest.fn(),
    }

    fakeAuthService = {
      logOut: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateAuthController],
      providers: [
        {
          provide: UserService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile()

    privateAuthController = module.get<PrivateAuthController>(PrivateAuthController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(privateAuthController).toBeDefined()
  })

  describe('whoAmI method', () => {
    it('Should return the user information', async () => {
      const mockUser: Partial<User> = { _id: new Types.ObjectId() }

      ;(fakeUserService.findUserById as jest.Mock).mockResolvedValueOnce(mockUser)

      const result = await privateAuthController.whoAmI(mockUser)

      expect(fakeUserService.findUserById).toHaveBeenCalledWith(mockUser._id)
      expect(fakeUserService.findUserById).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockUser)
    })
  })

  describe('logOut method', () => {
    it('should call authService.logOut with the correct arguments', async () => {
      const fakeRequest = {
        session: { accessToken: 'myAccessToken' },
      }
      ;(fakeAuthService.logOut as jest.Mock).mockResolvedValueOnce(fakeRequest.session.accessToken)

      const result = await privateAuthController.logOut(fakeRequest as any)

      expect(fakeAuthService.logOut).toHaveBeenCalledWith(fakeRequest.session.accessToken)
      expect(fakeAuthService.logOut).toHaveBeenCalledTimes(1)
    })
  })
})
