import { PrivateAnalyticsPostController } from '../private-post-analytics.controller'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { PostService } from '@src/modules/post/services'
import { Test, TestingModule } from '@nestjs/testing'
import { ResultMessage } from '@src/shared/types'

describe('🏠PrivateAnalyticsPostController | Controller Layer', () => {
  let privateAnalyticsPostController: PrivateAnalyticsPostController
  let postService: PostService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateAnalyticsPostController],
      providers: [
        {
          provide: PostService,
          useValue: {
            getAllPublishedPostsCountWithGivenTagId: jest.fn(),
            getAllUnPublishedPostsCountWithGivenTagId: jest.fn(),
            getAllPostsCountWithGivenTagId: jest.fn(),
            getAllPublishedPostsCountWithGivenKeywordId: jest.fn(),
            getAllUnPublishedPostsCountWithGivenKeywordId: jest.fn(),
            getAllPostsCountWithGivenKeywordId: jest.fn(),
            getAllPublishedPostsCountWithGivenSeriesId: jest.fn(),
            getAllUnPublishedPostsCountWithGivenSeriesId: jest.fn(),
            getAllPostsCountWithGivenSeriesId: jest.fn(),
            getAllPublishedPostsCount: jest.fn(),
            getAllUnPublishedPostsCount: jest.fn(),
            getAllPostsCount: jest.fn(),
          },
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile()

    privateAnalyticsPostController = module.get<PrivateAnalyticsPostController>(PrivateAnalyticsPostController)
    postService = module.get<PostService>(PostService)
  })





  afterEach(() => {
    jest.clearAllMocks()
  })


  describe('getAllPublishedPostsCountForGivenTagId method', () => {
    it('should return count of published posts for a given tag', async () => {
      const tagId = 'tag123'
      const expectedResult: ResultMessage = { message: 'Count: 10' }

      ;(postService.getAllPublishedPostsCountWithGivenTagId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPublishedPostsCountForGivenTagId(tagId)

      expect(postService.getAllPublishedPostsCountWithGivenTagId).toHaveBeenCalledWith(tagId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllUnPublishedPostsCountForGivenTagId method', () => {
    it('should return count of unpublished posts for a given tag', async () => {
      const tagId = 'tag123'
      const expectedResult: ResultMessage = { message: 'Count: 5' }

      ;(postService.getAllUnPublishedPostsCountWithGivenTagId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllUnPublishedPostsCountForGivenTagId(tagId)

      expect(postService.getAllUnPublishedPostsCountWithGivenTagId).toHaveBeenCalledWith(tagId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllPostsCountForGivenTagId method', () => {
    it('should return count of all posts for a given tag', async () => {
      const tagId = 'tag123'
      const expectedResult: ResultMessage = { message: 'Count: 15' }

      ;(postService.getAllPostsCountWithGivenTagId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPostsCountForGivenTagId(tagId)

      expect(postService.getAllPostsCountWithGivenTagId).toHaveBeenCalledWith(tagId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllPublishedPostsCountForGivenKeywordId method', () => {
    it('should return count of published posts for a given keyword', async () => {
      const keywordId = 'keyword123'
      const expectedResult: ResultMessage = { message: 'Count: 8' }

      ;(postService.getAllPublishedPostsCountWithGivenKeywordId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPublishedPostsCountForGivenKeywordId(keywordId)

      expect(postService.getAllPublishedPostsCountWithGivenKeywordId).toHaveBeenCalledWith(keywordId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllUnPublishedPostsCountForGivenKeywordId method', () => {
    it('should return count of unpublished posts for a given keyword', async () => {
      const keywordId = 'keyword123'
      const expectedResult: ResultMessage = { message: 'Count: 3' }

      ;(postService.getAllUnPublishedPostsCountWithGivenKeywordId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllUnPublishedPostsCountForGivenKeywordId(keywordId)

      expect(postService.getAllUnPublishedPostsCountWithGivenKeywordId).toHaveBeenCalledWith(keywordId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllPostsCountForGivenKeywordId method', () => {
    it('should return count of all posts for a given keyword', async () => {
      const keywordId = 'keyword123'
      const expectedResult: ResultMessage = { message: 'Count: 11' }

      ;(postService.getAllPostsCountWithGivenKeywordId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPostsCountForGivenKeywordId(keywordId)

      expect(postService.getAllPostsCountWithGivenKeywordId).toHaveBeenCalledWith(keywordId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllPublishedPostsCountForGivenSeriesId method', () => {
    it('should return count of published posts for a given series', async () => {
      const seriesId = 'series123'
      const expectedResult: ResultMessage = { message: 'Count: 7' }

      ;(postService.getAllPublishedPostsCountWithGivenKeywordId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPublishedPostsCountForGivenSeriesId(seriesId)

      expect(postService.getAllPublishedPostsCountWithGivenKeywordId).toHaveBeenCalledWith(seriesId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllUnPublishedPostsCountForGivenSeriesId method', () => {
    it('should return count of unpublished posts for a given series', async () => {
      const seriesId = 'series123'
      const expectedResult: ResultMessage = { message: 'Count: 4' }

      ;(postService.getAllUnPublishedPostsCountWithGivenKeywordId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllUnPublishedPostsCountForGivenSeriesId(seriesId)

      expect(postService.getAllUnPublishedPostsCountWithGivenKeywordId).toHaveBeenCalledWith(seriesId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllPostsCountForGivenSeriesId method', () => {
    it('should return count of all posts for a given series', async () => {
      const seriesId = 'series123'
      const expectedResult: ResultMessage = { message: 'Count: 9' }

      ;(postService.getAllPostsCountWithGivenKeywordId as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPostsCountForGivenSeriesId(seriesId)

      expect(postService.getAllPostsCountWithGivenKeywordId).toHaveBeenCalledWith(seriesId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllPublishedPostsCount method', () => {
    it('should return count of all published posts', async () => {
      const expectedResult: ResultMessage = { message: 'Count: 20' }

      ;(postService.getAllPublishedPostsCount as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPublishedPostsCount()

      expect(postService.getAllPublishedPostsCount).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllUnPublishedPostsCount method', () => {
    it('should return count of all unpublished posts', async () => {
      const expectedResult: ResultMessage = { message: 'Count: 12' }

      ;(postService.getAllUnPublishedPostsCount as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllUnPublishedPostsCount()

      expect(postService.getAllUnPublishedPostsCount).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllPostsCount method', () => {
    it('should return count of all posts', async () => {
      const expectedResult: ResultMessage = { message: 'Count: 30' }

      ;(postService.getAllPostsCount as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateAnalyticsPostController.getAllPostsCount()

      expect(postService.getAllPostsCount).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
  })
})
