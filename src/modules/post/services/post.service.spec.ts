import { ArePostsAvailableForGivenEntitiesIds, GetAllPostsDto, GetPostBySlug, PostsFilter } from '../interfaces'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { SortFieldOptions, SortValueOptions } from '@src/shared/enums'
import { KeywordService } from '../../keyword/services'
import { CreatePostDto, DeletePostDto } from '../dtos'
import { SeriesService } from '../../series/services'
import { Test, TestingModule } from '@nestjs/testing'
import { ResultMessage } from '@src/shared/types'
import { PostRepository } from '../repositories'
import { TagService } from '../../tag/services'
import { Pagination } from '@src/shared/dtos'
import { PostService } from './post.service'
import { Post } from '../schemas'

describe('🏠PostService | Service Layer', () => {
  let postService: Partial<PostService>
  let postRepository: Partial<PostRepository>
  let tagService: Partial<TagService>
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

  describe('createPost method', () => {
    it('should create a post successfully', async () => {
      const postData: Partial<CreatePostDto> = {
        title: 'Test Post',
        content: 'Test content',
        tags: ['tag1', 'tag2'],
        keywords: ['keyword1', 'keyword2'],
        series: ['series1'],
      }

      jest.spyOn(tagService, 'areTagsAvailable').mockResolvedValueOnce()
      jest.spyOn(keywordService, 'areKeywordsAvailable').mockResolvedValueOnce()
      jest.spyOn(seriesService, 'areSeriesAvailable').mockResolvedValueOnce()

      jest.spyOn(postRepository, 'createOne').mockResolvedValueOnce(postData as any)

      const result = await postService.createPost(postData as CreatePostDto)

      expect(result).toBeDefined()
      expect(result).toEqual(postData)
      expect(tagService.areTagsAvailable).toHaveBeenCalledWith(postData.tags)
      expect(keywordService.areKeywordsAvailable).toHaveBeenCalledWith(postData.keywords)
      expect(seriesService.areSeriesAvailable).toHaveBeenCalledWith(postData.series)
      expect(postRepository.createOne).toHaveBeenCalledWith(postData)
    })
  })

  describe('updatePost method', () => {
    it('should update a post successfully', async () => {
      const postId = 'ID'
      const payload: CreatePostDto = {
        title: 'Updated Post',
        content: 'Updated content',
        tags: ['tag1', 'tag2'],
        keywords: ['keyword1', 'keyword2'],
        series: ['series1'],
        description: 'sdf',
        imageUrl: 'https://www.example.com',
      }

      jest.spyOn(postService, 'isPostAvailable').mockResolvedValueOnce({} as any)
      jest.spyOn(postRepository, 'updateOne').mockResolvedValueOnce(payload as any)
      jest.spyOn(tagService, 'areTagsAvailable').mockResolvedValueOnce()
      jest.spyOn(keywordService, 'areKeywordsAvailable').mockResolvedValueOnce()
      jest.spyOn(seriesService, 'areSeriesAvailable').mockResolvedValueOnce()

      const result = await postService.updatePost(postId, payload)

      expect(result).toBeDefined()
      expect(postService.isPostAvailable).toHaveBeenCalledWith(postId)
      expect(tagService.areTagsAvailable).toHaveBeenCalledWith(payload.tags || [])
      expect(keywordService.areKeywordsAvailable).toHaveBeenCalledWith(payload.keywords || [])
      expect(seriesService.areSeriesAvailable).toHaveBeenCalledWith(payload.series || [])
      expect(postRepository.updateOne).toHaveBeenCalledWith(postId, payload)
    })
  })

  describe('deletePost method', () => {
    it('should delete a post successfully', async () => {
      const postData: DeletePostDto = {
        postId: 'ID',
      }

      jest.spyOn(postService, 'isPostAvailable').mockResolvedValueOnce({} as any)
      jest.spyOn(postRepository, 'deleteOne').mockResolvedValueOnce({} as any)

      const result = await postService.deletePost(postData)

      expect(result).toBeDefined()
      expect(postService.isPostAvailable).toHaveBeenCalledWith(postData.postId)
      expect(postRepository.deleteOne).toHaveBeenCalledWith(postData)
    })
  })

  describe('publishPost method', () => {
    it('should publish a post successfully', async () => {
      const postId = 'ID'
      const foundPost = { _id: postId, isPublished: false }

      jest.spyOn(postService, 'isPostAvailable').mockResolvedValueOnce(foundPost as any)
      jest.spyOn(postRepository, 'updateOne').mockResolvedValueOnce({} as any)

      const result = await postService.publishPost(postId)

      expect(result).toBeDefined()
      expect(postService.isPostAvailable).toHaveBeenCalledWith(postId)
      expect(postRepository.updateOne).toHaveBeenCalledWith(postId, {
        isPublished: true,
        publishedAt: expect.any(Date),
      })
    })

    it('should throw BadRequestException if post is already published', async () => {
      const postId = 'ID'
      const foundPost = { _id: postId, isPublished: true }

      jest.spyOn(postService, 'isPostAvailable').mockResolvedValueOnce(foundPost as any)

      await expect(postService.publishPost(postId)).rejects.toThrow(BadRequestException)
      expect(postService.isPostAvailable).toHaveBeenCalledWith(postId)
    })
  })

  describe('unPublishPost method', () => {
    it('should unpublish a post successfully', async () => {
      const postId = 'ID'
      const foundPost = { _id: postId, isPublished: true }

      jest.spyOn(postService, 'isPostAvailable').mockResolvedValueOnce(foundPost as any)
      jest.spyOn(postRepository, 'updateOne').mockResolvedValueOnce({} as any)

      const result = await postService.unPublishPost(postId)

      expect(result).toBeDefined()
      expect(postService.isPostAvailable).toHaveBeenCalledWith(postId)
      expect(postRepository.updateOne).toHaveBeenCalledWith(postId, {
        isPublished: false,
        unPublishedAt: expect.any(Date),
      })
    })

    it('should throw BadRequestException if post is already unpublished', async () => {
      const postId = 'ID'
      const foundPost = { _id: postId, isPublished: false }

      jest.spyOn(postService, 'isPostAvailable').mockResolvedValueOnce(foundPost as any)

      await expect(postService.unPublishPost(postId)).rejects.toThrow(BadRequestException)
      expect(postService.isPostAvailable).toHaveBeenCalledWith(postId)
    })
  })

  describe('arePostsAvailableForGivenEntitiesIds method', () => {
    it('should return true if a post is found for the given entities', async () => {
      const tagId = 'tagId'
      const keywordId = 'keywordId'
      const seriesId = 'seriesId'

      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce({} as any)

      const result = await postService.arePostsAvailableForGivenEntitiesIds({
        tagId,
        keywordId,
        seriesId,
      } as ArePostsAvailableForGivenEntitiesIds)

      expect(result).toBe(true)
      expect(postRepository.findOne).toHaveBeenCalledWith({
        tags: tagId,
        keywords: keywordId,
        series: seriesId,
      })
    })

    it('should return false if no post is found for the given entities', async () => {
      const tagId = 'tagId'
      const keywordId = 'keywordId'
      const seriesId = 'seriesId'

      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(null)

      const result = await postService.arePostsAvailableForGivenEntitiesIds({
        tagId,
        keywordId,
        seriesId,
      } as ArePostsAvailableForGivenEntitiesIds)

      expect(result).toBe(false)
      expect(postRepository.findOne).toHaveBeenCalledWith({
        tags: tagId,
        keywords: keywordId,
        series: seriesId,
      })
    })
  })

  describe('getPostBySlug method', () => {
    it('should return a post by slug and update views', async () => {
      const slug = 'test-post'
      const isPublished = true
      const mockPost = { _id: 'postId', views: 5 }

      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(mockPost as Post)

      const result = await postService.getPostBySlug({ slug, isPublished } as GetPostBySlug)

      expect(result).toEqual({ ...mockPost, views: 6 })
      expect(postRepository.findOne).toHaveBeenCalledWith({ slug, isPublished })
      expect(postRepository.updateOne).toHaveBeenCalledWith('postId', { views: 6 })
    })

    it('should throw NotFoundException if no post is found for the given slug', async () => {
      const slug = 'non-existent-post'
      const isPublished = true

      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(null)

      await expect(postService.getPostBySlug({ slug, isPublished })).rejects.toThrow(NotFoundException)

      expect(postRepository.findOne).toHaveBeenCalledWith({ slug, isPublished })
      expect(postRepository.updateOne).not.toHaveBeenCalled()
    })
  })

  describe('isPostAvailable method', () => {
    it('should return a post if it is available', async () => {
      const postId = 'postId'
      const mockPost = { _id: postId } as Partial<Post>

      jest.spyOn(postRepository, 'findOne').mockResolvedValueOnce(mockPost as Post)

      await postService.isPostAvailable(postId)

      expect(postRepository.findOneById).toHaveBeenCalledWith(postId)
    })

    it('should throw NotFoundException if no post is found for the given postId', async () => {
      const postId = 'non-existent-post'

      jest.spyOn(postRepository, 'findOneById').mockResolvedValueOnce(null)

      try {
        await expect(postService.isPostAvailable(postId))
        expect(postRepository.findOneById).toHaveBeenCalledWith(postId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('getAllPosts method', () => {
    it('should return all posts with sorting based on the provided sortValue', async () => {
      const filter: PostsFilter = {}
      const pagination: Pagination = {}
      const isPublished = true
      const sortValue = 1
      const mockPosts = [{ _id: 'postId1' }, { _id: 'postId2' }]

      jest.spyOn(postRepository, 'findMany').mockResolvedValueOnce(mockPosts as any)

      const result = await postService.getAllPosts({ filter, pagination, isPublished, sortValue } as GetAllPostsDto)

      expect(result).toEqual(mockPosts)
      expect(postRepository.findMany).toHaveBeenCalledWith({
        filter,
        pagination,
        isPublished,
        sortCondition: `${SortFieldOptions.PUBLISHED_AT}`,
      })
    })
  })

  describe('getLatestPosts method', () => {
    it('should return the latest posts', async () => {
      const pagination: Pagination = {}
      const isPublished = true

      const mockPosts: Partial<Post>[] = [{ _id: '1' }, { _id: '2' }]

      jest.spyOn(postRepository, 'findMany').mockResolvedValueOnce(mockPosts as Post[])

      const result = await postService.getLatestPosts({ pagination, isPublished } as GetAllPostsDto)

      expect(result).toEqual(mockPosts)
      expect(postRepository.findMany).toHaveBeenCalledWith({
        pagination,
        isPublished,
        sortCondition: `-${SortFieldOptions.CREATED_AT}`,
      })
    })
  })

  describe('getPublishedPosts method', () => {
    it('should return the published posts', async () => {
      const pagination: Pagination = {}

      const mockPosts: Partial<Post>[] = [{ _id: '1' }, { _id: '2' }]

      jest.spyOn(postRepository, 'findMany').mockResolvedValueOnce(mockPosts as Post[])

      const result = await postService.getPublishedPosts({ pagination })

      expect(result).toEqual(mockPosts)
      expect(postRepository.findMany).toHaveBeenCalledWith({
        pagination,
        isPublished: true,
        sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
      })
    })
  })

  describe('getUnPublishedPosts method', () => {
    it('should return the unpublished posts', async () => {
      const pagination = { page: 1, limit: 10 }

      const mockPosts: Partial<Post>[] = [{ _id: '1' }, { _id: '2' }]

      jest.spyOn(postRepository, 'findMany').mockResolvedValueOnce(mockPosts as Post[])

      const result = await postService.getUnPublishedPosts({ pagination } as GetAllPostsDto)

      expect(result).toEqual(mockPosts)
      expect(postRepository.findMany).toHaveBeenCalledWith({
        pagination,
        isPublished: false,
        sortCondition: `-${SortFieldOptions.PUBLISHED_AT}`,
      })
    })
  })

  describe('getPopularPosts method', () => {
    it('should return the popular posts', async () => {
      const pagination: Pagination = {}

      const mockPosts: Partial<Post>[] = [{ _id: '1' }, { _id: '2' }]

      jest.spyOn(postRepository, 'findMany').mockResolvedValueOnce(mockPosts as Post[])

      const result = await postService.getPopularPosts({ pagination })

      expect(result).toEqual(mockPosts)
      expect(postRepository.findMany).toHaveBeenCalledWith({
        pagination,
        sortCondition: `-${SortFieldOptions.VIEWS}`,
      })
    })
  })

  describe('getUnPopularPosts method', () => {
    it('should return the unpopular posts', async () => {
      const pagination: Pagination = {}

      const mockPosts: Partial<Post>[] = [{ _id: '1' }, { _id: '2' }]

      jest.spyOn(postRepository, 'findMany').mockResolvedValueOnce(mockPosts as Post[])

      const result = await postService.getUnPopularPosts({ pagination } as GetAllPostsDto)

      expect(result).toEqual(mockPosts)
      expect(postRepository.findMany).toHaveBeenCalledWith({
        pagination,
        sortCondition: `+${SortFieldOptions.VIEWS}`,
      })
    })
  })

  describe('getTrendingPosts method', () => {
    it('should return the trending posts', async () => {
      const pagination: Pagination = {}

      const mockPosts: Partial<Post>[] = [{ _id: '1' }, { _id: '2' }]

      jest.spyOn(postRepository, 'findMany').mockResolvedValueOnce(mockPosts as Post[])

      const result = await postService.getTrendingPosts({ pagination })

      expect(result).toEqual(mockPosts)
      expect(postRepository.findMany).toHaveBeenCalledWith({
        pagination,
        sortCondition: { [SortFieldOptions.PUBLISHED_AT]: SortValueOptions.DESC, views: SortValueOptions.DESC },
      })
    })
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
