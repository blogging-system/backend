import { Test, TestingModule } from '@nestjs/testing'
import { KeywordController } from '../../controllers/private-keyword.controller'

describe('KeywordController', () => {
  let controller: KeywordController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeywordController],
    }).compile()

    controller = module.get<KeywordController>(KeywordController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
