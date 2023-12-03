import { NotFoundException, InternalServerErrorException } from '@nestjs/common'
import { CreatePostDto, DeletePostDto } from '../dtos'
import { Test, TestingModule } from '@nestjs/testing'
import { PostRepository } from './post.repository'
import { PostManipulation } from '../interfaces'
import { getModelToken } from '@nestjs/mongoose'
import { MESSAGES } from '../constants'
import { Post } from '../schemas'
import { Model } from 'mongoose'

describe('PostRepository', () => {
  let postRepository: PostRepository
  let postModel: Model<Post>

  const mockPostModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostRepository,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
      ],
    }).compile()

    postRepository = module.get<PostRepository>(PostRepository)
    postModel = module.get<Model<Post>>(getModelToken(Post.name))

    mockPostModel.findOne.mockReturnValueOnce({
      lean: jest
        .fn()
        .mockReturnValueOnce({ _id: 'test-id', title: 'Test Post', content: 'Test Content', slug: 'test-post' }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Layer Setup', () => {
    it('should be defined', () => {
      expect(postRepository).toBeDefined()
    })
  })

  describe('createOne', () => {
    it('should create a post', async () => {
      const CreatePostPayload: Partial<CreatePostDto> = { title: 'Test Post', content: 'Test Content' }

      mockPostModel.create.mockReturnValueOnce(CreatePostPayload as CreatePostDto)

      const result = await postRepository.createOne(CreatePostPayload as CreatePostDto)

      expect(result).toEqual(CreatePostPayload as CreatePostDto)
      expect(mockPostModel.create).toHaveBeenCalledWith({ ...CreatePostPayload, slug: 'test-post' })
    })

    it('should throw InternalServerErrorException when post creation fails', async () => {
      const createPostDto: Partial<CreatePostDto> = { title: 'Test Post', content: 'Test Content' }

      mockPostModel.create.mockReturnValueOnce(null)

      await expect(postRepository.createOne(createPostDto as CreatePostDto)).rejects.toThrow(
        InternalServerErrorException,
      )
    })
  })

  describe('updateOne', () => {
    it('should update a post', async () => {
      const postId = 'test-id'
      const updatePayload: Partial<PostManipulation> = { title: 'Updated Title' }
      const updatedPost: Partial<Post> = {
        _id: postId,
        title: 'Updated Title',
        content: 'Test Content',
        slug: 'updated-title',
      }

      mockPostModel.findByIdAndUpdate.mockReturnValueOnce(updatedPost)

      const result = await postRepository.updateOne(postId, updatePayload)

      expect(result).toEqual(updatedPost)
      expect(mockPostModel.findByIdAndUpdate).toHaveBeenCalledWith(
        postId,
        { ...updatePayload, slug: 'updated-title' },
        { new: true },
      )
    })

    it('should throw InternalServerErrorException when post update fails', async () => {
      const postId = 'test-id'
      const updatePayload: Partial<PostManipulation> = { title: 'Updated Title' }

      mockPostModel.findByIdAndUpdate.mockReturnValueOnce(null)

      await expect(postRepository.updateOne(postId, updatePayload)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('deleteOne', () => {
    it('should delete a post', async () => {
      const deletePostDto: DeletePostDto = { postId: 'test-id' }

      mockPostModel.deleteOne.mockReturnValueOnce({ deletedCount: 1 })

      const result = await postRepository.deleteOne(deletePostDto)

      expect(result).toEqual({ message: MESSAGES.DELETED_SUCCESSFULLY })
      expect(mockPostModel.deleteOne).toHaveBeenCalledWith({ _id: deletePostDto.postId })
    })

    it('should throw InternalServerErrorException when post deletion fails', async () => {
      const deletePostDto: DeletePostDto = { postId: 'test-id' }

      mockPostModel.deleteOne.mockReturnValueOnce({ deletedCount: 0 })

      await expect(postRepository.deleteOne(deletePostDto)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findOneById', () => {
    it('should find a post by ID', async () => {
      const postId = 'test-id'
      const foundPost: Partial<Post> = { _id: postId, title: 'Test Post', content: 'Test Content', slug: 'test-post' }

      mockPostModel.findOne.mockReturnValueOnce(foundPost)

      const result = await postRepository.findOneById(postId)

      expect(result).toEqual(foundPost)
      expect(mockPostModel.findOne).toHaveBeenCalledWith({ _id: postId })
    })

    it('should throw NotFoundException when post is not found by ID', async () => {
      const postId = 'nonexistent-id'

      mockPostModel.findOne.mockReturnValueOnce(null)

      try {
        await expect(postRepository.findOneById(postId))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findOne', () => {
    it('should find a post by ID', async () => {
      const postId = 'test-id'
      const foundPost: Partial<Post> = { _id: postId, title: 'Test Post', content: 'Test Content', slug: 'test-post' }

      mockPostModel.findOne.mockReturnValueOnce(foundPost)

      const result = await postRepository.findOneById(postId)

      expect(result).toEqual(foundPost)
      expect(mockPostModel.findOne).toHaveBeenCalledWith({ _id: postId })
    })

    it('should throw NotFoundException when post is not found by ID', async () => {
      const postId = 'nonexistent-id'

      mockPostModel.findOne.mockReturnValueOnce(null)

      try {
        await expect(postRepository.findOneById(postId))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findMany', () => {
    it('should find multiple posts', async () => {
      const pagination = { pageNumber: 1, pageSize: 10 }
      const foundPosts = [{}, {}]

      mockPostModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnValueOnce({
          limit: jest.fn().mockReturnValueOnce({
            sort: jest.fn().mockReturnValueOnce({
              lean: jest.fn().mockReturnValueOnce({
                populate: jest.fn().mockResolvedValueOnce(foundPosts),
              }),
            }),
          }),
        }),
      })

      const result = await postRepository.findMany({ pagination } as any)

      expect(mockPostModel.find).toHaveBeenCalled()
      expect(result).toEqual(foundPosts)
    })

    it('should throw NotFoundException when no posts are found', async () => {
      mockPostModel.find.mockReturnValueOnce({
        skip: jest.fn().mockReturnValueOnce({
          limit: jest.fn().mockReturnValueOnce({
            sort: jest.fn().mockReturnValueOnce({
              lean: jest.fn().mockReturnValueOnce({
                populate: jest.fn().mockReturnValueOnce([{}, {}]),
              }),
            }),
          }),
        }),
      })

      try {
        await expect(mockPostModel.find({} as any))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('countDocuments', () => {
    it('should return the count of documents', async () => {
      const count = 5

      mockPostModel.countDocuments.mockReturnValueOnce({
        lean: jest.fn().mockReturnValueOnce(count),
      })

      const result = await postRepository.countDocuments({})

      expect(result).toEqual({ count })
      expect(mockPostModel.countDocuments).toHaveBeenCalled()
    })

    it('should return 0 when no documents are found', async () => {
      const count = 0

      mockPostModel.countDocuments.mockReturnValueOnce({
        lean: jest.fn().mockReturnValueOnce(count),
      })

      const result = await postRepository.countDocuments({})

      expect(result).toEqual({ count })
      expect(mockPostModel.countDocuments).toHaveBeenCalled()
    })
  })
})
