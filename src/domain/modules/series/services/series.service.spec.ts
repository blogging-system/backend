import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, GetSeriesBySlug } from '../dtos'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { SortFieldOptions, SortValueOptions } from '@src/shared/enums'
import { PostService } from '@src/domain/modules/post/services'
import { Test, TestingModule } from '@nestjs/testing'
import { SeriesRepository } from '../repositories'
import { ResultMessage } from '@src/shared/types'
import { SeriesService } from './series.service'
import { MESSAGES } from '../constants'
import { Series } from '../schemas'

describe('🏠SeriesService | Service Layer', () => {
  let seriesRepository: Partial<SeriesRepository>
  let seriesService: Partial<SeriesService>
  let postService: Partial<PostService>

  beforeEach(async () => {
    seriesRepository = {
      createOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      findOne: jest.fn(),
      findOneById: jest.fn(),
      findMany: jest.fn(),
      countDocuments: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeriesService,
        {
          provide: SeriesRepository,
          useValue: seriesRepository,
        },
        {
          provide: PostService,
          useValue: {
            arePostsAvailableForGivenEntitiesIds: jest.fn(),
          },
        },
      ],
    }).compile()

    seriesService = module.get<SeriesService>(SeriesService)
    seriesRepository = module.get<SeriesRepository>(SeriesRepository)
    postService = module.get<PostService>(PostService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createSeries method', () => {
    it('should create a series successfully', async () => {
      const seriesData: Partial<CreateSeriesDto> = {}

      jest.spyOn(seriesRepository, 'createOne').mockResolvedValueOnce(seriesData as Series)

      const result = await seriesService.createSeries(seriesData as CreateSeriesDto)

      expect(result).toBeDefined()
      expect(result).toEqual(seriesData)
      expect(seriesRepository.createOne).toHaveBeenCalledWith(seriesData)
    })
  })

  describe('updateSeries method', () => {
    it('should update a series successfully', async () => {
      const seriesId = 'someSeriesId'
      const updateSeriesDto: Partial<CreateSeriesDto> = {}
      const mockSeries: Partial<Series> = {}

      jest.spyOn(seriesRepository, 'updateOne').mockResolvedValueOnce(mockSeries as Series)
      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(seriesId as any)

      const result = await seriesService.updateSeries(seriesId, updateSeriesDto as CreateSeriesDto)

      expect(result).toEqual(mockSeries)
      expect(seriesRepository.updateOne).toHaveBeenCalledWith(seriesId, updateSeriesDto)
      expect(seriesRepository.findOneById).toHaveBeenCalledWith(seriesId)
    })
  })

  describe('deleteSeries method', () => {
    it('should delete a series successfully', async () => {
      const seriesId = 'someSeriesId'
      const deleteSeriesDto: DeleteSeriesDto = { seriesId }
      const mockSeries: Partial<Series> = { _id: seriesId }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(mockSeries as Series)
      jest.spyOn(seriesService, 'isSeriesAssociatedToPosts').mockResolvedValueOnce()
      jest.spyOn(seriesRepository, 'deleteOne').mockResolvedValueOnce({} as ResultMessage)

      const result = await seriesService.deleteSeries(deleteSeriesDto)

      expect(result).toBeDefined()
      expect(seriesRepository.findOneById).toHaveBeenCalledWith(seriesId)
      expect(seriesService.isSeriesAssociatedToPosts).toHaveBeenCalledWith(seriesId)
      expect(seriesRepository.deleteOne).toHaveBeenCalledWith(deleteSeriesDto)
    })

    it('should throw NotFoundException if series is not found for deletion', async () => {
      const seriesId = 'non-existent-series'
      const deleteSeriesDto: DeleteSeriesDto = { seriesId }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(null)

      try {
        await expect(seriesService.deleteSeries(deleteSeriesDto))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })

    it('should throw BadRequestException if series is associated with posts for deletion', async () => {
      const seriesId = 'someSeriesId'
      const deleteSeriesDto: DeleteSeriesDto = { seriesId }
      const mockSeries: Partial<Series> = { _id: seriesId }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(mockSeries as Series)
      jest.spyOn(seriesService, 'isSeriesAssociatedToPosts').mockResolvedValueOnce()

      try {
        await expect(seriesService.deleteSeries(deleteSeriesDto))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })
  })

  describe('publishSeries method', () => {
    it('should publish a series successfully', async () => {
      const seriesId = 'someSeriesId'
      const mockSeries: Partial<Series> = { _id: seriesId, isPublished: false }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(mockSeries as Series)
      jest.spyOn(seriesRepository, 'updateOne').mockResolvedValueOnce(mockSeries as Series)

      const result = await seriesService.publishSeries(seriesId)

      expect(result).toBeDefined()
      expect(result.message).toEqual(MESSAGES.PUBLISHED_SUCCESSFULLY)
      expect(seriesRepository.findOneById).toHaveBeenCalledWith(seriesId)
      expect(seriesRepository.updateOne).toHaveBeenCalledWith(seriesId, {
        isPublished: true,
        publishedAt: expect.any(Date),
      })
    })

    it('should throw BadRequestException if series is already published', async () => {
      const seriesId = 'someSeriesId'
      const mockSeries: Partial<Series> = { _id: seriesId, isPublished: true }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(mockSeries as Series)

      try {
        await expect(() => seriesService.publishSeries(seriesId))
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
      }
    })
  })

  //====================

  describe('unPublishSeries method', () => {
    it('should unpublish a series successfully', async () => {
      const seriesId = 'someSeriesId'
      const mockSeries: Partial<Series> = { _id: seriesId, isPublished: true }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(mockSeries as Series)
      jest.spyOn(seriesRepository, 'updateOne').mockResolvedValueOnce(mockSeries as Series)

      const result = await seriesService.unPublishSeries(seriesId)

      expect(result).toBeDefined()
      expect(result.message).toEqual(MESSAGES.UNPUBLISHED_SUCCESSFULLY)
      expect(seriesRepository.findOneById).toHaveBeenCalledWith(seriesId)
      expect(seriesRepository.updateOne).toHaveBeenCalledWith(seriesId, {
        isPublished: false,
        unPublishedAt: expect.any(Date),
      })
    })

    it('should throw BadRequestException if series is already unpublished', async () => {
      const seriesId = 'someSeriesId'
      const mockSeries: Partial<Series> = { _id: seriesId, isPublished: false }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(mockSeries as Series)

      await expect(seriesService.unPublishSeries(seriesId)).rejects.toThrow(BadRequestException)
      expect(seriesRepository.findOneById).toHaveBeenCalledWith(seriesId)
    })
  })

  describe('isSeriesAssociatedToPosts method', () => {
    it('should throw BadRequestException if series is associated to posts', async () => {
      const seriesId = 'someSeriesId'

      jest.spyOn(postService, 'arePostsAvailableForGivenEntitiesIds').mockResolvedValueOnce(true)

      await expect(seriesService.isSeriesAssociatedToPosts(seriesId)).rejects.toThrow(BadRequestException)
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ seriesId })
    })

    it('should not throw an exception if series is not associated to posts', async () => {
      const seriesId = 'someSeriesId'

      jest.spyOn(postService, 'arePostsAvailableForGivenEntitiesIds').mockResolvedValueOnce(false)

      await expect(seriesService.isSeriesAssociatedToPosts(seriesId)).resolves.not.toThrow()
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ seriesId })
    })
  })

  describe('getSeries method', () => {
    it('should return series if found', async () => {
      const seriesId = 'someSeriesId'
      const mockSeries: Partial<Series> = { _id: seriesId }

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(mockSeries as Series)

      const result = await seriesRepository.findOneById(seriesId)

      expect(result).toEqual(mockSeries)
      expect(seriesRepository.findOneById).toHaveBeenCalledWith(seriesId)
    })

    it('should throw NotFoundException if series is not found', async () => {
      const seriesId = 'non-existent-series'

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(null)

      try {
        await expect(() => seriesRepository.findOneById(seriesId))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('areSeriesAvailable method', () => {
    it('should throw NotFoundException if any series is not available', async () => {
      const seriesIds = ['existent-series-1', 'non-existent-series', 'existent-series-2']

      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce({ _id: 'existent-series-1' } as Series)
      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce(null)
      jest.spyOn(seriesRepository, 'findOneById').mockResolvedValueOnce({ _id: 'existent-series-2' } as Series)

      await expect(() => seriesService.areSeriesAvailable(seriesIds)).rejects.toThrow(NotFoundException)
      expect(seriesRepository.findOneById).toHaveBeenCalledWith('non-existent-series')
    })

    it('should not throw an exception if all series are available', async () => {
      const seriesIds = ['existent-series-1', 'existent-series-2']

      jest.spyOn(seriesRepository, 'findOne').mockResolvedValueOnce({ _id: 'existent-series-1' } as Series)
      jest.spyOn(seriesRepository, 'findOne').mockResolvedValueOnce({ _id: 'existent-series-2' } as Series)

      await expect(() => seriesService.areSeriesAvailable(seriesIds)).rejects.toThrow(NotFoundException)
    })
  })

  describe('getSeriesBySlug method', () => {
    it('should return series if found and update views', async () => {
      const slug = 'some-slug'
      const isPublished = true
      const mockSeries: Partial<Series> = { _id: 'someSeriesId' }

      jest.spyOn(seriesRepository, 'findOne').mockResolvedValueOnce(mockSeries as Series)
      jest.spyOn(seriesRepository, 'updateOne').mockResolvedValueOnce(mockSeries as Series)

      const result = await seriesService.getSeriesBySlug({ slug, isPublished } as GetSeriesBySlug)

      expect(seriesRepository.findOne).toHaveBeenCalledWith({ slug, isPublished })
      expect(seriesRepository.updateOne).toHaveBeenCalledWith(mockSeries._id, {
        views: mockSeries.views + 1,
      })
    })

    it('should throw NotFoundException if series is not found', async () => {
      const slug = 'non-existent-slug'
      const isPublished = true

      jest.spyOn(seriesRepository, 'findOne').mockResolvedValueOnce(null)

      try {
        await expect(() => seriesService.getSeriesBySlug({ slug, isPublished }))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('getAllSeries method', () => {
    it('should return all series with pagination, isPublished, and sortValue conditions', async () => {
      const pagination = { page: 1, limit: 10 }
      const isPublished = true
      const sortValue = 1
      const mockSeriesList: Series[] = [{}, {}] as Series[]

      jest.spyOn(seriesRepository, 'findMany').mockResolvedValueOnce(mockSeriesList)

      const result = await seriesService.getAllSeries({ pagination, isPublished, sortValue } as GetAllSeriesDto)

      expect(result).toEqual(mockSeriesList)
      expect(seriesRepository.findMany).toHaveBeenCalledWith({
        pagination,
        isPublished,
        sortCondition: `${SortFieldOptions.PUBLISHED_AT}`,
      })
    })

    // Add more test cases for different conditions if needed
  })

  describe('getUnPublishedSeries method', () => {
    it('should return unpublished series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const mockSeriesList: Series[] = [{}, {}] as Series[]

      jest.spyOn(seriesRepository, 'findMany').mockResolvedValueOnce(mockSeriesList)

      const result = await seriesService.getUnPublishedSeries({ pagination } as GetAllSeriesDto)

      expect(result).toEqual(mockSeriesList)
      expect(seriesRepository.findMany).toHaveBeenCalledWith({
        pagination,
        isPublished: false,
        sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
      })
    })

    // Add more test cases for different conditions if needed
  })

  describe('getPopularSeries method', () => {
    it('should return popular series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const mockSeriesList: Series[] = [{}, {}] as Series[]

      jest.spyOn(seriesRepository, 'findMany').mockResolvedValueOnce(mockSeriesList)

      const result = await seriesService.getPopularSeries({ pagination } as GetAllSeriesDto)

      expect(result).toEqual(mockSeriesList)
      expect(seriesRepository.findMany).toHaveBeenCalledWith({
        pagination,
        sortCondition: `-${SortFieldOptions.VIEWS}`,
      })
    })
  })

  describe('getUnPopularSeries method', () => {
    it('should return unpopular series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const mockSeriesList: Series[] = [{}, {}] as Series[]

      jest.spyOn(seriesRepository, 'findMany').mockResolvedValueOnce(mockSeriesList)

      const result = await seriesService.getUnPopularSeries({ pagination } as GetAllSeriesDto)

      expect(result).toEqual(mockSeriesList)
      expect(seriesRepository.findMany).toHaveBeenCalledWith({
        pagination,
        sortCondition: `+${SortFieldOptions.VIEWS}`,
      })
    })
  })

  describe('getTrendingSeries method', () => {
    it('should return trending series with pagination', async () => {
      const pagination = { page: 1, limit: 10 }
      const mockSeriesList: Series[] = [{}, {}] as Series[]

      jest.spyOn(seriesRepository, 'findMany').mockResolvedValueOnce(mockSeriesList)

      const result = await seriesService.getTrendingSeries({ pagination } as GetAllSeriesDto)

      expect(result).toEqual(mockSeriesList)
      expect(seriesRepository.findMany).toHaveBeenCalledWith({
        pagination,
        sortCondition: { [SortFieldOptions.PUBLISHED_AT]: SortValueOptions.DESC, views: SortValueOptions.DESC },
      })
    })
  })

  describe('getAllSeriesCount method', () => {
    it('should return the count of all series', async () => {
      const mockCountResult: ResultMessage = { message: 'Count: 10' }

      jest.spyOn(seriesRepository, 'countDocuments').mockResolvedValueOnce(mockCountResult)

      const result = await seriesService.getAllSeriesCount()

      expect(result).toEqual(mockCountResult)
      expect(seriesRepository.countDocuments).toHaveBeenCalledWith({})
    })
  })

  describe('getAllPublishedSeriesCount method', () => {
    it('should return the count of all published series', async () => {
      const mockCountResult: ResultMessage = { message: 'Count: 5' }

      jest.spyOn(seriesRepository, 'countDocuments').mockResolvedValueOnce(mockCountResult)

      const result = await seriesService.getAllPublishedSeriesCount()

      expect(result).toEqual(mockCountResult)
      expect(seriesRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true })
    })
  })

  describe('getAllUnPublishedSeriesCount method', () => {
    it('should return the count of all unpublished series', async () => {
      const mockCountResult: ResultMessage = { message: 'Count: 3' }

      jest.spyOn(seriesRepository, 'countDocuments').mockResolvedValueOnce(mockCountResult)

      const result = await seriesService.getAllUnPublishedSeriesCount()

      expect(result).toEqual(mockCountResult)
      expect(seriesRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false })
    })
  })
})
