import { Test, TestingModule } from '@nestjs/testing'
import { PublicAuthController } from '../../controllers'
import { AuthService } from '../../services'

describe('PublicAuthController', () => {
  let controller: PublicAuthController

  beforeEach(async () => {
    const fakeAuthService: Partial<AuthService> = {
      // login = () => {},
      // logOut = () => {},
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicAuthController],
      providers: [{ provide: AuthService, useValue: fakeAuthService }],
    }).compile()

    controller = module.get<PublicAuthController>(PublicAuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
