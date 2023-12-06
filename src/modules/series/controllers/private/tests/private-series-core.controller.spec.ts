import { PrivateSeriesCoreController } from '../private-series-core.controller'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { SeriesService } from '@src/modules/series/services'
import { CreateSeriesDto } from '@src/modules/series/dtos'
import { Test, TestingModule } from '@nestjs/testing'
import { Series } from '@src/modules/series/schemas'
import { ResultMessage } from '@src/shared/contracts/types'
import { Pagination } from '@src/shared/contracts/dtos'
import { Types } from 'mongoose'

describe('🏠PrivateSeriesCoreController | Controller Layer', () => {
  let privateSeriesCoreController: PrivateSeriesCoreController
  let seriesService: SeriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateSeriesCoreController],
      providers: [
        {
          provide: SeriesService,
          useValue: {
            createSeries: jest.fn(),
            updateSeries: jest.fn(),
            deleteSeries: jest.fn(),
            publishSeries: jest.fn(),
            unPublishSeries: jest.fn(),
            getLatestSeries: jest.fn(),
            getPublishedSeries: jest.fn(),
            getUnPublishedSeries: jest.fn(),
            getPopularSeries: jest.fn(),
            getUnPopularSeries: jest.fn(),
            getTrendingSeries: jest.fn(),
            getSeriesBySlug: jest.fn(),
            getAllSeries: jest.fn(),
          },
        },
      ],
    })

      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile()

    privateSeriesCoreController = module.get<PrivateSeriesCoreController>(PrivateSeriesCoreController)
    seriesService = module.get<SeriesService>(SeriesService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createSeries method', () => {
    it('should create a new series', async () => {
      const data = { title: 'New Series', description: 'Description for the new series' }
      const expectedResult: Partial<Series> = { _id: new Types.ObjectId(), ...data }

      ;(seriesService.createSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.createSeries(data as CreateSeriesDto)

      expect(seriesService.createSeries).toHaveBeenCalledWith(data)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('updateSeries method', () => {
    it('should update an existing series', async () => {
      const seriesId = new Types.ObjectId()
      const payload = { title: 'Updated Series', description: 'Updated description' }
      const expectedResult: Partial<Series> = { _id: seriesId, ...payload }

      ;(seriesService.updateSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.updateSeries(seriesId, payload as CreateSeriesDto)

      expect(seriesService.updateSeries).toHaveBeenCalledWith(seriesId, payload)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('deleteSeries method', () => {
    it('should delete an existing series', async () => {
      const seriesId = new Types.ObjectId()
      const expectedResult: ResultMessage = { message: 'Series deleted successfully' }

      ;(seriesService.deleteSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.deleteSeries({ seriesId })

      expect(seriesService.deleteSeries).toHaveBeenCalledWith({ seriesId })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('publishSeries method', () => {
    it('should publish an existing series', async () => {
      const seriesId = new Types.ObjectId()
      const expectedResult: ResultMessage = { message: 'Series published successfully' }

      ;(seriesService.publishSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.publishSeries(seriesId)

      expect(seriesService.publishSeries).toHaveBeenCalledWith(seriesId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('unPublishSeries method', () => {
    it('should unpublish an existing series', async () => {
      const seriesId = new Types.ObjectId()
      const expectedResult: ResultMessage = { message: 'Series unpublished successfully' }

      ;(seriesService.unPublishSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.unPublishSeries(seriesId)

      expect(seriesService.unPublishSeries).toHaveBeenCalledWith(seriesId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getLatestSeries method', () => {
    it('should return the latest published series', async () => {
      const pagination = { page: 1, limit: 10 }
      const expectedResult: Partial<Series>[] = [
        { _id: new Types.ObjectId(), title: 'Series 1' },
        { _id: new Types.ObjectId(), title: 'Series 2' },
      ]

      ;(seriesService.getLatestSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getLatestSeries(pagination as Pagination)

      expect(seriesService.getLatestSeries).toHaveBeenCalledWith({ pagination, isPublished: true })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPublishedSeries method', () => {
    it('should return all published series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const expectedResult: Partial<Series>[] = [
        { _id: new Types.ObjectId(), title: 'Series 1' },
        { _id: new Types.ObjectId(), title: 'Series 2' },
      ]

      ;(seriesService.getPublishedSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getPublishedSeries(pagination as Pagination)

      expect(seriesService.getPublishedSeries).toHaveBeenCalledWith({ pagination })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getUnPublishedSeries method', () => {
    it('should return all unpublished series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const expectedResult: Partial<Series>[] = [
        { _id: new Types.ObjectId(), title: 'Series 1' },
        { _id: new Types.ObjectId(), title: 'Series 2' },
      ]

      ;(seriesService.getUnPublishedSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getUnPublishedSeries(pagination as Pagination)

      expect(seriesService.getUnPublishedSeries).toHaveBeenCalledWith({ pagination })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getPopularSeries method', () => {
    it('should return popular series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const expectedResult: Partial<Series>[] = [
        { _id: new Types.ObjectId(), title: 'Series 1' },
        { _id: new Types.ObjectId(), title: 'Series 2' },
      ]

      ;(seriesService.getPopularSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getPopularSeries(pagination as Pagination)

      expect(seriesService.getPopularSeries).toHaveBeenCalledWith({ pagination })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getUnPopularSeries method', () => {
    it('should return unpopular series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const expectedResult: Partial<Series>[] = [
        { _id: new Types.ObjectId(), title: 'Series 1' },
        { _id: new Types.ObjectId(), title: 'Series 2' },
      ]

      ;(seriesService.getUnPopularSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getUnPopularSeries(pagination as Pagination)

      expect(seriesService.getUnPopularSeries).toHaveBeenCalledWith({ pagination })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getTrendingSeries method', () => {
    it('should return trending series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const expectedResult: Partial<Series>[] = [
        { _id: new Types.ObjectId(), title: 'Series 1' },
        { _id: new Types.ObjectId(), title: 'Series 2' },
      ]

      ;(seriesService.getTrendingSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getTrendingSeries(pagination as Pagination)

      expect(seriesService.getTrendingSeries).toHaveBeenCalledWith({ pagination })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getSeriesBySlug method', () => {
    it('should return a series by slug', async () => {
      const slug = 'sample-series'
      const expectedResult: Partial<Series> = {
        _id: new Types.ObjectId(),
        title: 'Sample Series',
        slug: 'sample-series',
        description: 'This is a sample series.',
      }

      ;(seriesService.getSeriesBySlug as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getSeriesBySlug(slug)

      expect(seriesService.getSeriesBySlug).toHaveBeenCalledWith({ slug })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllSeries method', () => {
    it('should return all series with pagination and sorting', async () => {
      const pagination = { page: 1, limit: 10, sort: 1 }
      const expectedResult: Partial<Series>[] = [
        { _id: new Types.ObjectId(), title: 'Series 1' },
        { _id: new Types.ObjectId(), title: 'Series 2' },
      ]

      ;(seriesService.getAllSeries as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateSeriesCoreController.getAllSeries(pagination as Pagination)

      expect(seriesService.getAllSeries).toHaveBeenCalledWith({ pagination, sortValue: pagination.sort })
      expect(result).toEqual(expectedResult)
    })
  })
})
