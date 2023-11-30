// import { UserService } from '@src/modules/user/services'
// import { AuthService, LoginAttemptService } from '../../services'
// import { SessionService } from '@src/modules/session/services'
// import { HashUtil, TokenUtil } from '@src/shared/utils'
// import { Test, TestingModule } from '@nestjs/testing'
// import { LoginDto } from '../../dtos'
// import { CreateUserDto } from '@src/modules/user/dtos'
// import { User } from '@src/modules/user/schemas'

// // Import the actual TokenUtil for mocking
// import { TokenUtil as RealTokenUtil } from '@src/shared/utils/token.util'

// // Mock the TokenUtil methods
// jest.mock('@src/shared/utils/token.util')

// describe('🏠Auth Service | Login', () => {
//   let authService: AuthService
//   let fakeUserService: Partial<UserService>
//   let fakeLoginAttemptService: Partial<LoginAttemptService>
//   let fakeSessionService: Partial<SessionService>
//   let fakeHashUtil: Partial<HashUtil>

//   beforeEach(async () => {
//     fakeUserService = {
//       createUser: jest.fn(),
//       findUserByEmail: jest.fn(),
//     }

//     fakeLoginAttemptService = {
//       isFailedLoginAttemptsExceeded: jest.fn(),
//       incrementFailedLoginAttemptsCount: jest.fn(),
//     }

//     fakeSessionService = {
//       createSession: jest.fn(),
//       getSession: jest.fn(),
//       deleteSession: jest.fn(),
//     }

//     fakeHashUtil = {
//       verifyHash: jest.fn(async () => await Promise.resolve(true)), // Provide a mock implementation
//     }

//     // Reset the mock implementation for each test
//     ;(RealTokenUtil.generateAccessToken as jest.Mock).mockReset()
//     ;(RealTokenUtil.generateRefreshToken as jest.Mock).mockReset()
//     ;(RealTokenUtil.verifyAccessToken as jest.Mock).mockReset()
//     ;(RealTokenUtil.verifyRefreshToken as jest.Mock).mockReset()

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         { provide: UserService, useValue: fakeUserService },
//         { provide: LoginAttemptService, useValue: fakeLoginAttemptService },
//         { provide: SessionService, useValue: fakeSessionService },
//         { provide: HashUtil, useValue: fakeHashUtil },
//         { provide: TokenUtil, useClass: RealTokenUtil }, // Use the actual TokenUtil class
//       ],
//     }).compile()

//     authService = module.get<AuthService>(AuthService)
//   })

//   it('should login successfully and return tokens', async () => {
//     const mockData: LoginDto = {
//       email: 'test@example.com',
//       password: 'password123',
//     }

//     const mockUser = { _id: 'mockUserId', password: 'hashedPassword' }
//     const mockIpAddress = '127.0.0.1'
//     const mockDevice = { browser: 'Chrome' }
//     const mockAccessToken = 'mockAccessToken'
//     const mockRefreshToken = 'mockRefreshToken'

//     fakeUserService.findUserByEmail.mockResolvedValueOnce(mockUser)

//     // Mock the TokenUtil methods
//     ;(RealTokenUtil.generateAccessToken as jest.Mock).mockResolvedValueOnce(mockAccessToken)
//     ;(RealTokenUtil.generateRefreshToken as jest.Mock).mockResolvedValueOnce(mockRefreshToken)

//     const result = await authService.login(mockData, mockIpAddress, mockDevice)

//     expect(result).toEqual({
//       accessToken: mockAccessToken,
//       refreshToken: mockRefreshToken,
//     })

//     expect(fakeLoginAttemptService.isFailedLoginAttemptsExceeded).toHaveBeenCalled()
//     expect(fakeUserService.findUserByEmail).toHaveBeenCalledWith(mockData.email)
//     expect(fakeHashUtil.verifyHash).toHaveBeenCalledWith(mockData.password, mockUser.password)
//     expect(RealTokenUtil.generateAccessToken).toHaveBeenCalledWith({ _id: mockUser._id })
//     expect(RealTokenUtil.generateRefreshToken).toHaveBeenCalledWith({ _id: mockUser._id })
//     expect(fakeSessionService.createSession).toHaveBeenCalledWith({
//       accessToken: mockAccessToken,
//       refreshToken: mockRefreshToken,
//       ipAddress: mockIpAddress,
//       device: mockDevice,
//     })
//   })
// })
