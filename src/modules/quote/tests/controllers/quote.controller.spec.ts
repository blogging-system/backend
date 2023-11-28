import { Test, TestingModule } from '@nestjs/testing'
import { PublicQuoteController } from '../../controllers/public/public-quote.controller'

describe('QuoteController', () => {
  let controller: PublicQuoteController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicQuoteController],
    }).compile()

    controller = module.get<PublicQuoteController>(PublicQuoteController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
