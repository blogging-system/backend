import { BadRequestException, NotFoundException } from '@nestjs/common'
import { PostService } from '@src/app/post/services'
import { Test, TestingModule } from '@nestjs/testing'
import { ResultMessage } from '@src/shared/data/types'
import { TagRepository } from '../repositories'
import { TagService } from './tag.service'
import { CreateTagDto } from '../dtos'
import { Tag } from '../schemas'

describe('🏠TagService | Service Layer', () => {
  let tagService: TagService
  let tagRepository: Partial<TagRepository>
  let postService: Partial<PostService>

  beforeEach(async () => {
    tagRepository = {
      createOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      findOneById: jest.fn(),
      findMany: jest.fn(),
      countDocuments: jest.fn(),
    }

    postService = {
      arePostsAvailableForGivenEntitiesIds: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        { provide: TagRepository, useValue: tagRepository },
        { provide: PostService, useValue: postService },
      ],
    }).compile()

    tagService = module.get<TagService>(TagService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createTag method', () => {
    it('should create a tag successfully', async () => {
      const createTagDto: CreateTagDto = { name: 'Tag 1' }
      const mockTag: Tag = { _id: 'someTagId', ...createTagDto }

      tagRepository.createOne = jest.fn().mockResolvedValueOnce(mockTag as Tag)

      const result = await tagService.createTag(createTagDto)

      expect(result).toEqual(mockTag)
      expect(tagRepository.createOne).toHaveBeenCalledWith(createTagDto)
    })
  })

  describe('updateTag method', () => {
    it('should update a tag successfully', async () => {
      const tagId = 'someTagId'
      const updateTagDto: CreateTagDto = { name: 'Updated Tag' }
      const mockTag: Tag = { _id: tagId, ...updateTagDto }

      tagRepository.updateOne = jest.fn().mockResolvedValueOnce(mockTag as Tag)
      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(mockTag as Tag)

      const result = await tagService.updateTag(tagId, updateTagDto)

      expect(result).toEqual(mockTag)
      expect(tagRepository.updateOne).toHaveBeenCalledWith(tagId, updateTagDto)
      expect(tagRepository.findOneById).toHaveBeenCalledWith(tagId)
    })

    it('should throw NotFoundException if tag does not exist', async () => {
      const tagId = 'nonexistentTagId'
      const updateTagDto: CreateTagDto = { name: 'Updated Tag' }

      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(null)

      try {
        await expect(() => tagService.updateTag(tagId, updateTagDto))
        expect(tagRepository.updateOne).not.toHaveBeenCalled()
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('deleteTag method', () => {
    it('should delete a tag successfully', async () => {
      const tagId = 'someTagId'
      const mockResult: ResultMessage = { message: 'Tag deleted successfully' }

      tagRepository.deleteOne = jest.fn().mockResolvedValueOnce(mockResult)
      tagRepository.findOneById = jest.fn().mockResolvedValueOnce({} as Tag)
      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(false)

      const result = await tagService.deleteTag(tagId)

      expect(result).toEqual(mockResult)
      expect(tagRepository.deleteOne).toHaveBeenCalledWith(tagId)
      expect(tagRepository.findOneById).toHaveBeenCalledWith(tagId)
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ tagId })
    })

    it('should throw NotFoundException if tag does not exist', async () => {
      const tagId = 'nonexistentTagId'

      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(null)

      try {
        await expect(tagService.deleteTag(tagId))
        expect(tagRepository.deleteOne).not.toHaveBeenCalled()
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })

    it('should throw BadRequestException if tag is associated with posts', async () => {
      const tagId = 'someTagId'

      tagRepository.findOneById = jest.fn().mockResolvedValueOnce({} as Tag)
      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(true)

      await expect(tagService.deleteTag(tagId)).rejects.toThrow(BadRequestException)
      expect(tagRepository.deleteOne).not.toHaveBeenCalled()
    })
  })

  describe('getTag method', () => {
    it('should get a tag successfully', async () => {
      const tagId = 'someTagId'
      const mockTag: Tag = { _id: tagId, name: 'Tag 1' }

      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(mockTag)

      const result = await tagService.getTag(tagId)

      expect(result).toEqual(mockTag)
      expect(tagRepository.findOneById).toHaveBeenCalledWith(tagId)
    })

    it('should throw NotFoundException if tag does not exist', async () => {
      const tagId = 'nonexistentTagId'

      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(null)

      try {
        await expect(tagService.getTag(tagId))
        expect(tagRepository.findOneById).toHaveBeenCalledWith(tagId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('isTagAssociatedToPosts method', () => {
    it('should throw BadRequestException if tag is associated with posts', async () => {
      const tagId = 'someTagId'

      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(true)

      await expect(tagService.isTagAssociatedToPosts(tagId)).rejects.toThrowError(BadRequestException)
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ tagId })
    })

    it('should not throw an error if tag is not associated with posts', async () => {
      const tagId = 'someTagId'

      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(false)

      await expect(tagService.isTagAssociatedToPosts(tagId)).resolves.not.toThrow()
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ tagId })
    })
  })

  describe('areTagsAvailable method', () => {
    it('should not throw an error if tags are available', async () => {
      const tagIds: string[] = ['tagId1', 'tagId2', 'tagId3']
      const mockTags: Tag[] = [
        { _id: 'tagId1', name: 'Tag 1' },
        { _id: 'tagId2', name: 'Tag 2' },
        { _id: 'tagId3', name: 'Tag 3' },
      ]

      tagRepository.findOneById = jest
        .fn()
        .mockResolvedValueOnce(mockTags[0])
        .mockResolvedValueOnce(mockTags[1])
        .mockResolvedValueOnce(mockTags[2])

      await expect(tagService.areTagsAvailable(tagIds)).resolves.not.toThrow()
      expect(tagRepository.findOneById).toHaveBeenCalledWith('tagId1')
      expect(tagRepository.findOneById).toHaveBeenCalledWith('tagId2')
      expect(tagRepository.findOneById).toHaveBeenCalledWith('tagId3')
    })

    it('should throw NotFoundException if tags are not available', async () => {
      const tagIds = ['nonexistentTagId1', 'nonexistentTagId2', 'nonexistentTagId3']

      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(null)
      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(null)
      tagRepository.findOneById = jest.fn().mockResolvedValueOnce(null)

      await expect(tagService.areTagsAvailable(tagIds)).rejects.toThrow(NotFoundException)
      expect(tagRepository.findOneById).toHaveBeenCalledWith('nonexistentTagId1')
      expect(tagRepository.findOneById).toHaveBeenCalledWith('nonexistentTagId2')
      expect(tagRepository.findOneById).toHaveBeenCalledWith('nonexistentTagId3')
    })
  })

  describe('getAllTags method', () => {
    it('should get all tags successfully', async () => {
      const mockTags: Tag[] = [
        { _id: 'tagId1', name: 'Tag 1' },
        { _id: 'tagId2', name: 'Tag 2' },
        { _id: 'tagId3', name: 'Tag 3' },
      ]

      tagRepository.findMany = jest.fn().mockResolvedValueOnce(mockTags)

      const result = await tagService.getAllTags()

      expect(result).toEqual(mockTags)
      expect(tagRepository.findMany).toHaveBeenCalled()
    })
  })

  describe('getAllTagsCount method', () => {
    it('should return the count of all tags', async () => {
      const mockCountResult: ResultMessage = { message: 'Count: 5' }

      tagRepository.countDocuments = jest.fn().mockResolvedValueOnce(mockCountResult)

      const result = await tagService.getAllTagsCount()

      expect(result).toEqual(mockCountResult)
      expect(tagRepository.countDocuments).toHaveBeenCalled()
    })
  })
})
