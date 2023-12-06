import { PublicSeriesController } from './public-series.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { BadRequestException } from '@nestjs/common'
import { SeriesService } from '../../services'
import { Pagination } from '@src/shared/data/dtos'
import { Series } from '../../schemas'

describe('🏠PublicSeriesController | Controller Layer', () => {
  let publicSeriesController: PublicSeriesController
  let seriesService: SeriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicSeriesController],
      providers: [
        {
          provide: SeriesService,
          useValue: {
            getSeriesBySlug: jest.fn(),
            getAllSeries: jest.fn(),
          },
        },
      ],
    }).compile()

    publicSeriesController = module.get<PublicSeriesController>(PublicSeriesController)
    seriesService = module.get<SeriesService>(SeriesService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getSeriesBySlug method', () => {
    it('should return a series by slug', async () => {
      const slug = 'sample-series'
      const expectedResult: Partial<Series> = {
        _id: '1',
        title: 'Sample Series',
        slug: 'sample-series',
        description: 'This is a sample series.',
      }

      ;(seriesService.getSeriesBySlug as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await publicSeriesController.getSeriesBySlug({ slug })

      expect(seriesService.getSeriesBySlug).toHaveBeenCalledWith({ slug, isPublished: true })
      expect(result).toEqual(expectedResult)
    })

    it('should throw an error if slug is not provided', async () => {
      try {
        await expect(publicSeriesController.getSeriesBySlug({} as any))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error if slug is provided but empty', async () => {
      try {
        await expect(publicSeriesController.getSeriesBySlug({ slug: '' }))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error if slug is too short', async () => {
      try {
        await expect(publicSeriesController.getSeriesBySlug({ slug: 'ab' }))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error if slug is too long', async () => {
      try {
        await expect(publicSeriesController.getSeriesBySlug({ slug: 'a'.repeat(51) }))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })

    it('should throw an error if slug is not of type string', async () => {
      try {
        await expect(publicSeriesController.getSeriesBySlug({ slug: 123 } as any))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })
  })

  describe('getAllSeries method', () => {
    it('should return all published series with pagination and filters', async () => {
      const pagination: Partial<Pagination> = {}
      const tagId = 'tag123'
      const keywordId = 'keyword123'
      const expectedResult: Partial<Series>[] = [
        {
          _id: '1',
          title: 'Series 1',
          description: 'Description for Series 1',
        },
        {
          _id: '2',
          title: 'Series 2',
          description: 'Description for Series 2',
        },
      ]

      ;(seriesService.getAllSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await publicSeriesController.getAllSeries({
        tagId,
        keywordId,
        ...pagination,
      })

      expect(seriesService.getAllSeries).toHaveBeenCalledWith({
        pagination,
        isPublished: true,
      })
      expect(result).toEqual(expectedResult)
    })
  })
})
