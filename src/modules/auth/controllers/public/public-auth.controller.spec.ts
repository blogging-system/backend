import { PublicAuthController } from './public-auth.controller'
import { AuthService } from '../../services/auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'
import { LoginResponse } from '../../types'
import { LoginDto } from '../../dtos'
import exp from 'constants'

describe('🏠PublicAuthController', () => {
  let publicAuthController: PublicAuthController
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeAuthService = {
      login: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicAuthController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile()

    publicAuthController = module.get<PublicAuthController>(PublicAuthController)
  })

  it('should be defined', () => {
    expect(publicAuthController).toBeDefined()
  })

  describe('Login functionality', () => {
    it('Should return a successful login response', async () => {
      const loginDto: LoginDto = {
        email: 'test@gmail.com',
        password: 'myPassword',
      }

      const ipAddress = '127.0.0.1'
      const device = {}

      const expectedLoginResponse: LoginResponse = {
        accessToken: '',
        refreshToken: '',
      }

      ;(fakeAuthService.login as jest.Mock).mockResolvedValueOnce(expectedLoginResponse)

      const result = await publicAuthController.login(loginDto, ipAddress, device)

      expect(fakeAuthService.login).toHaveBeenCalledWith(loginDto, ipAddress, device)
      expect(result).toEqual(expectedLoginResponse)
    })

    it('Should throw error if the loginDto is empty ', async () => {
      const emptyLoginDto: Partial<LoginDto> = {}
      try {
        await publicAuthController.login(emptyLoginDto as any, '127.0.0.1', {})
      } catch (error) {
        console.error(error)
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('Should throw error if the loginDto is invalid ', async () => {
      const emptyLoginDto: Partial<LoginDto> = {
        email: 1 as any,
      }
      try {
        await publicAuthController.login(emptyLoginDto as any, '127.0.0.1', {})
      } catch (error) {
        console.error(error)
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })
  })
})
