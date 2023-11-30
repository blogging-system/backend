import { Test, TestingModule } from '@nestjs/testing'
import { SeriesController } from '../../controllers/private/private-series-analytics.controller'

describe('SeriesController', () => {
  let controller: SeriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeriesController],
    }).compile()

    controller = module.get<SeriesController>(SeriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
