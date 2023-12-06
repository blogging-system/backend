import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './modules.controller'
import { AppService } from './modules.service'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = module.get<AppController>(AppController)
    appService = module.get<AppService>(AppService)
  })

  describe('ping method', () => {
    it('should return a result message from the AppService', () => {
      jest.spyOn(appService, 'ping').mockReturnValueOnce({})

      const result = appController.ping()

      expect(appService.ping).toHaveBeenCalled()
      expect(result).toEqual({})
    })
  })

  describe('getHello method', () => {
    it('should return a welcome response from the AppService', () => {
      jest.spyOn(appService, 'getHello').mockReturnValueOnce({} as any)

      const result = appController.getHello()

      expect(appService.getHello).toHaveBeenCalled()
      expect(result).toEqual({})
    })
  })
})
