import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { PrivateTagController } from './private-tag.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { ResultMessage } from '@src/shared/contracts/types'
import { TagService } from '../../services'
import { CreateTagDto } from '../../dtos'
import { Tag } from '../../schemas'
import { Types } from 'mongoose'

describe('🏠PrivateTagController | Controller Layer', () => {
  let privateTagController: PrivateTagController
  let tagService: TagService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateTagController],
      providers: [
        {
          provide: TagService,
          useValue: {
            createTag: jest.fn(),
            updateTag: jest.fn(),
            deleteTag: jest.fn(),
            getAllTagsCount: jest.fn(),
          },
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile()

    privateTagController = module.get<PrivateTagController>(PrivateTagController)
    tagService = module.get<TagService>(TagService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createTag method', () => {
    it('should create a new tag', async () => {
      const createTagDto: CreateTagDto = {
        name: 'New Tag',
      }
      const expectedResult: Tag = {
        _id: new Types.ObjectId(),
        name: 'New Tag',
      }

      ;(tagService.createTag as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateTagController.createTag(createTagDto)

      expect(tagService.createTag).toHaveBeenCalledWith(createTagDto)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('updateTag method', () => {
    it('should update an existing tag', async () => {
      const tagId = new Types.ObjectId()
      const updateTagDto: CreateTagDto = {
        name: 'Updated Tag',
      }
      const expectedResult: Tag = {
        _id: tagId,
        name: 'Updated Tag',
      }

      ;(tagService.updateTag as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateTagController.updateTag(tagId, updateTagDto)

      expect(tagService.updateTag).toHaveBeenCalledWith(tagId, updateTagDto)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('deleteTag method', () => {
    it('should delete an existing tag', async () => {
      const tagId = new Types.ObjectId()
      const expectedResult: ResultMessage = {
        message: 'Tag deleted successfully',
      }

      ;(tagService.deleteTag as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateTagController.deleteTag(tagId)

      expect(tagService.deleteTag).toHaveBeenCalledWith(tagId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllTagsCount method', () => {
    it('should get the count of all tags', async () => {
      const expectedResult: ResultMessage = {
        message: 'Total tags: 10',
      }

      ;(tagService.getAllTagsCount as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateTagController.getAllTagsCount()

      expect(tagService.getAllTagsCount).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
  })
})
