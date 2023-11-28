import { Test, TestingModule } from '@nestjs/testing'
import { QuoteController } from '../../controllers/quote.controller'

describe('QuoteController', () => {
  let controller: QuoteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
    }).compile()

    controller = module.get<QuoteController>(QuoteController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
