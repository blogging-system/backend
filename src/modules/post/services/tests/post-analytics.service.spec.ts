import { KeywordService } from '../../../keyword/services'
import { SeriesService } from '../../../series/services'
import { Test, TestingModule } from '@nestjs/testing'
import { PostRepository } from '../../repositories'
import { TagService } from '../../../tag/services'
import { ResultMessage } from '@src/shared/contracts/types'
import { PostService } from '../post.service'

describe('🏠PostService | Service Layer', () => {
  let tagService: Partial<TagService>
  let postService: Partial<PostService>
  let postRepository: Partial<PostRepository>
  let seriesService: Partial<SeriesService>
  let keywordService: Partial<KeywordService>

  beforeEach(async () => {
    postRepository = {
      createOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      findOne: jest.fn(),
      findOneById: jest.fn(),
      findMany: jest.fn(),
      countDocuments: jest.fn(),
    }

    tagService = {
      areTagsAvailable: jest.fn(),
    }

    seriesService = {
      areSeriesAvailable: jest.fn(),
    }

    keywordService = {
      areKeywordsAvailable: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: postRepository,
        },
        {
          provide: TagService,
          useValue: tagService,
        },
        {
          provide: SeriesService,
          useValue: seriesService,
        },
        {
          provide: KeywordService,
          useValue: keywordService,
        },
      ],
    }).compile()

    postService = module.get<PostService>(PostService)
    postRepository = module.get<PostRepository>(PostRepository)
    tagService = module.get<TagService>(TagService)
    seriesService = module.get<SeriesService>(SeriesService)
    keywordService = module.get<KeywordService>(KeywordService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(postService).toBeDefined()
  })

  describe('getAllPostsCount method', () => {
    it('should return the count of all posts', async () => {
      const count = 10
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCount()

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({})
    })
  })

  describe('getAllPublishedPostsCount method', () => {
    it('should return the count of all published posts', async () => {
      const count = 5
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCount()

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true })
    })
  })

  describe('getAllUnPublishedPostsCount method', () => {
    it('should return the count of all unpublished posts', async () => {
      const count = 3
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCount()

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false })
    })
  })

  describe('getAllPostsCountWithGivenTagId method', () => {
    it('should return the count of all posts with a given tagId', async () => {
      const tagId = 'tag1'
      const count = 2
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCountWithGivenTagId(tagId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ tagId })
    })
  })

  describe('getAllPublishedPostsCountWithGivenTagId method', () => {
    it('should return the count of all published posts with a given tagId', async () => {
      const tagId = 'tag1'
      const count = 1
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCountWithGivenTagId(tagId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true, tagId })
    })
  })

  describe('getAllUnPublishedPostsCountWithGivenTagId method', () => {
    it('should return the count of all unpublished posts with a given tagId', async () => {
      const tagId = 'tag1'
      const count = 1
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCountWithGivenTagId(tagId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false, tagId })
    })
  })

  describe('getAllPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 3
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ keywordId })
    })
  })

  describe('getAllPublishedPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all published posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 2
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true, keywordId })
    })
  })

  describe('getAllUnPublishedPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all unpublished posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 1
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false, keywordId })
    })
  })

  describe('getAllPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 3
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ seriesId })
    })
  })

  describe('getAllPublishedPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all published posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 2
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true, seriesId })
    })
  })

  describe('getAllUnPublishedPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all unpublished posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 1
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false, seriesId })
    })
  })

  describe('getAllPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 5
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ keywordId })
    })
  })

  describe('getAllPublishedPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all published posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 3
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true, keywordId })
    })
  })

  describe('getAllUnPublishedPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all unpublished posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 2
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false, keywordId })
    })
  })

  describe('getAllPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 7
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ seriesId })
    })
  })

  describe('getAllPublishedPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all published posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 4
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true, seriesId })
    })
  })

  describe('getAllUnPublishedPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all unpublished posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 3
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false, seriesId })
    })
  })

  describe('getAllPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 5
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ keywordId })
    })
  })

  describe('getAllPublishedPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all published posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 3
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true, keywordId })
    })
  })

  describe('getAllUnPublishedPostsCountWithGivenKeywordId method', () => {
    it('should return the count of all unpublished posts with a given keywordId', async () => {
      const keywordId = 'keyword1'
      const count = 2
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCountWithGivenKeywordId(keywordId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false, keywordId })
    })
  })

  describe('getAllPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 7
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ seriesId })
    })
  })

  describe('getAllPublishedPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all published posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 4
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllPublishedPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: true, seriesId })
    })
  })

  describe('getAllUnPublishedPostsCountWithGivenSeriesId method', () => {
    it('should return the count of all unpublished posts with a given seriesId', async () => {
      const seriesId = 'series1'
      const count = 3
      jest.spyOn(postRepository, 'countDocuments').mockResolvedValueOnce({ count } as ResultMessage)

      const result = await postService.getAllUnPublishedPostsCountWithGivenSeriesId(seriesId)

      expect(result).toEqual({ count } as ResultMessage)
      expect(postRepository.countDocuments).toHaveBeenCalledWith({ isPublished: false, seriesId })
    })
  })
})
