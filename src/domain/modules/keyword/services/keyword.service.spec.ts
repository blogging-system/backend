import { BadRequestException, NotFoundException } from '@nestjs/common'
import { PostService } from '@src/domain/modules/post/services'
import { Test, TestingModule } from '@nestjs/testing'
import { KeywordRepository } from '../repositories'
import { KeywordService } from './keyword.service'
import { ResultMessage } from '@src/shared/types'
import { CreateKeywordDto } from '../dtos'
import { MESSAGES } from '../constants'
import { Keyword } from '../schemas'

describe('KeywordService', () => {
  let keywordService: KeywordService
  let keywordRepository: Partial<KeywordRepository>
  let postService: PostService

  beforeEach(async () => {
    keywordRepository = {
      createOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      findOneById: jest.fn(),
      findMany: jest.fn(),
      countDocuments: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeywordService,
        {
          provide: KeywordRepository,
          useValue: keywordRepository,
        },
        {
          provide: PostService,
          useValue: {
            arePostsAvailableForGivenEntitiesIds: jest.fn(),
          },
        },
      ],
    }).compile()

    keywordService = module.get<KeywordService>(KeywordService)
    keywordRepository = module.get<KeywordRepository>(KeywordRepository)
    postService = module.get<PostService>(PostService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createKeyword method', () => {
    it('should create a keyword', async () => {
      const mockKeyword: Keyword = { _id: 'mockId', name: 'test' }
      keywordRepository.createOne = jest.fn().mockResolvedValueOnce(mockKeyword)

      const result = await keywordService.createKeyword({ name: 'test' } as CreateKeywordDto)

      expect(result).toEqual(mockKeyword)
      expect(keywordRepository.createOne).toHaveBeenCalledWith({ name: 'test' })
    })
  })

  describe('updateKeyword method', () => {
    it('should update a keyword', async () => {
      const keywordId = 'mockId'
      const mockKeyword: Keyword = { _id: keywordId, name: 'test' }
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce(mockKeyword)
      keywordRepository.updateOne = jest.fn().mockResolvedValueOnce(mockKeyword)

      const result = await keywordService.updateKeyword(keywordId, { name: 'updated' } as CreateKeywordDto)

      expect(result).toEqual(mockKeyword)
      expect(keywordRepository.findOneById).toHaveBeenCalledWith(keywordId)
      expect(keywordRepository.updateOne).toHaveBeenCalledWith(keywordId, { name: 'updated' })
    })

    it('should throw NotFoundException when keyword does not exist', async () => {
      const keywordId = 'nonexistentId'
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce(null)

      try {
        await expect(keywordService.updateKeyword(keywordId, { name: 'updated' } as CreateKeywordDto))
      } catch (error) {
        expect(error).toBeInstanceOf(new NotFoundException(MESSAGES.KEYWORD_NOT_FOUND))
      }
    })
  })

  describe('deleteKeyword method', () => {
    it('should delete a keyword', async () => {
      const keywordId = 'mockId'
      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(false)
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce({ _id: keywordId, name: 'test' } as Keyword)
      keywordRepository.deleteOne = jest.fn().mockResolvedValueOnce({ message: 'Deleted successfully' })

      const result = await keywordService.deleteKeyword(keywordId)

      expect(result).toEqual({ message: 'Deleted successfully' })
      expect(keywordRepository.findOneById).toHaveBeenCalledWith(keywordId)
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ keywordId })
      expect(keywordRepository.deleteOne).toHaveBeenCalledWith(keywordId)
    })

    it('should throw NotFoundException when keyword does not exist', async () => {
      const keywordId = 'nonexistentId'
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce(null)

      try {
        await expect(keywordService.deleteKeyword(keywordId))
      } catch (error) {
        expect(error).toBeInstanceOf(new NotFoundException(MESSAGES.KEYWORD_NOT_FOUND))
      }
    })

    it('should throw BadRequestException when keyword is associated with posts', async () => {
      const keywordId = 'mockId'
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce({ _id: keywordId, name: 'test' } as Keyword)
      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(true)

      await expect(keywordService.deleteKeyword(keywordId)).rejects.toThrow(
        new BadRequestException(MESSAGES.KEYWORD_ASSOCIATED_TO_POST),
      )
    })
  })

  describe('isKeywordAssociatedToPosts', () => {
    it('should throw BadRequestException when keyword is associated with posts', async () => {
      const keywordId = 'mockId'
      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(true)

      await expect(keywordService.isKeywordAssociatedToPosts(keywordId)).rejects.toThrow(
        new BadRequestException(MESSAGES.KEYWORD_ASSOCIATED_TO_POST),
      )
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ keywordId })
    })

    it('should not throw an error when keyword is not associated with posts', async () => {
      const keywordId = 'mockId'
      postService.arePostsAvailableForGivenEntitiesIds = jest.fn().mockResolvedValueOnce(false)

      await expect(keywordService.isKeywordAssociatedToPosts(keywordId)).resolves.not.toThrow()
      expect(postService.arePostsAvailableForGivenEntitiesIds).toHaveBeenCalledWith({ keywordId })
    })
  })

  describe('isKeywordAvailable method', () => {
    it('should return the keyword when it is available', async () => {
      const keywordId = 'mockId'
      const mockKeyword: Keyword = { _id: keywordId, name: 'test' }
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce(mockKeyword)

      const result = await keywordService.isKeywordAvailable(keywordId)

      expect(result).toEqual(mockKeyword)
      expect(keywordRepository.findOneById).toHaveBeenCalledWith(keywordId)
    })

    it('should throw NotFoundException when keyword is not available', async () => {
      const keywordId = 'nonexistentId'
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce(null)

      try {
        await expect(keywordService.isKeywordAvailable(keywordId))
      } catch (error) {
        expect(error).toBeInstanceOf(new NotFoundException(MESSAGES.KEYWORD_NOT_FOUND))
      }
    })
  })

  describe('areKeywordsAvailable', () => {
    it('should not throw an error when all keywords are available', async () => {
      const tags = ['tag1', 'tag2', 'tag3']
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce({ _id: 'id1', name: 'tag1' } as Keyword)
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce({ _id: 'id2', name: 'tag2' } as Keyword)
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce({ _id: 'id3', name: 'tag3' } as Keyword)

      await expect(keywordService.areKeywordsAvailable(tags)).resolves.not.toThrow()
      expect(keywordRepository.findOneById).toHaveBeenCalledTimes(3)
    })

    it('should throw NotFoundException when at least one keyword is not available', async () => {
      const tags = ['tag1', 'tag2', 'tag3']
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce({ _id: 'id1', name: 'tag1' } as Keyword)
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce(null)
      keywordRepository.findOneById = jest.fn().mockResolvedValueOnce({ _id: 'id3', name: 'tag3' } as Keyword)

      try {
        await expect(keywordService.areKeywordsAvailable(tags))
        expect(keywordRepository.findOneById).toHaveBeenCalledTimes(3)
      } catch (error) {
        expect(error).toBeInstanceOf(new NotFoundException(MESSAGES.KEYWORD_NOT_FOUND))
      }
    })
  })

  describe('getAllKeywords', () => {
    it('should return all keywords', async () => {
      const mockKeywords: Keyword[] = [
        { _id: 'id1', name: 'tag1' },
        { _id: 'id2', name: 'tag2' },
        { _id: 'id3', name: 'tag3' },
      ]
      keywordRepository.findMany = jest.fn().mockResolvedValueOnce(mockKeywords)

      const result = await keywordService.getAllKeywords()

      expect(result).toEqual(mockKeywords)
      expect(keywordRepository.findMany).toHaveBeenCalled()
    })
  })

  describe('getAllKeywordsCount', () => {
    it('should return the count of all keywords', async () => {
      const mockCountResult: ResultMessage = { message: 'Count: 3' }
      keywordRepository.countDocuments = jest.fn().mockResolvedValueOnce(mockCountResult)

      const result = await keywordService.getAllKeywordsCount()

      expect(result).toEqual(mockCountResult)
      expect(keywordRepository.countDocuments).toHaveBeenCalled()
    })
  })
})
