import { Test, TestingModule } from '@nestjs/testing'
import { SeriesService } from '../../services/series.service'

describe('SeriesService', () => {
  let service: SeriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeriesService],
    }).compile()

    service = module.get<SeriesService>(SeriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
