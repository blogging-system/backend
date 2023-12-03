import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { TagRepository } from './tag.repository'
import { MESSAGES } from '../constants'
import { Model, Types } from 'mongoose'
import { CreateTagDto } from '../dtos'
import { Tag } from '../schemas'

describe('TagRepository', () => {
  let tagRepository: TagRepository
  let tagModel: Model<Tag>

  const mockTagModel = {
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
        TagRepository,
        {
          provide: getModelToken(Tag.name),
          useValue: mockTagModel,
        },
      ],
    }).compile()

    tagRepository = module.get<TagRepository>(TagRepository)
    tagModel = module.get<Model<Tag>>(getModelToken(Tag.name))

    mockTagModel.findOne.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({}),
    })

    mockTagModel.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([{}]),
    })

    mockTagModel.countDocuments.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce(5),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Layer Setup', () => {
    it('should be defined', () => {
      expect(tagRepository).toBeDefined()
    })
  })

  describe('createOne', () => {
    it('should create a tag successfully', async () => {
      const createTagDto: Partial<CreateTagDto> = {}

      const mockCreatedTag: Partial<Tag> = {}
      mockTagModel.create.mockResolvedValueOnce(mockCreatedTag)

      const result = await tagRepository.createOne(createTagDto as CreateTagDto)

      expect(mockTagModel.create).toHaveBeenCalledWith(createTagDto)
      expect(result).toEqual(mockCreatedTag)
    })

    it('should handle a failed creation and throw an InternalServerErrorException', async () => {
      const createTagDto: Partial<CreateTagDto> = {}

      mockTagModel.create.mockResolvedValueOnce(null)

      await expect(tagRepository.createOne(createTagDto as CreateTagDto)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('updateOne', () => {
    it('should update a tag successfully', async () => {
      const tagId = new Types.ObjectId().toHexString()
      const updateTagDto: Partial<CreateTagDto> = {}
      const mockUpdatedTag = {}

      mockTagModel.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedTag)

      const result = await tagRepository.updateOne(tagId, updateTagDto as CreateTagDto)

      expect(mockTagModel.findByIdAndUpdate).toHaveBeenCalledWith(tagId, updateTagDto, { new: true })
      expect(result).toEqual(mockUpdatedTag)
    })

    it('should handle a failed update and throw an InternalServerErrorException', async () => {
      const tagId = new Types.ObjectId().toHexString()
      const updateTagDto: Partial<CreateTagDto> = {}

      mockTagModel.findByIdAndUpdate.mockResolvedValueOnce(null)

      await expect(tagRepository.updateOne(tagId, updateTagDto as CreateTagDto)).rejects.toThrow(
        InternalServerErrorException,
      )
    })
  })

  describe('deleteOne', () => {
    it('should delete a tag successfully', async () => {
      const tagId = new Types.ObjectId().toHexString()
      const mockDeleteResult = { deletedCount: 1 }

      mockTagModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      const result = await tagRepository.deleteOne(tagId)

      expect(mockTagModel.deleteOne).toHaveBeenCalled()
      expect(result).toEqual({ message: MESSAGES.DELETED_SUCCESSFULLY })
    })

    it('should handle a failed deletion and throw an InternalServerErrorException', async () => {
      const tagId = new Types.ObjectId().toHexString()
      const mockDeleteResult = { deletedCount: 0 }

      mockTagModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      await expect(tagRepository.deleteOne(tagId)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findOneById', () => {
    it('should find a tag by ID successfully', async () => {
      const tagId = new Types.ObjectId().toHexString()
      const mockTag = {}

      const result = await tagRepository.findOneById(tagId)

      expect(mockTagModel.findOne).toHaveBeenCalledWith({ _id: tagId })
      expect(result).toEqual(mockTag)
    })

    it('should handle a failed find by ID and throw a NotFoundException', async () => {
      const tagId = new Types.ObjectId().toHexString()

      try {
        await expect(tagRepository.findOneById(tagId))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findMany', () => {
    it('should find multiple tags successfully', async () => {
      const mockTagsList = [{}]

      const result = await tagRepository.findMany()

      expect(mockTagModel.find).toHaveBeenCalledWith()
      expect(result).toEqual(mockTagsList)
    })

    it('should handle a failed find many and throw a NotFoundException', async () => {
      try {
        await expect(tagRepository.findMany())
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('countDocuments', () => {
    it('should count documents successfully', async () => {
      const mockCount = 5
      mockTagModel.countDocuments.mockResolvedValueOnce(mockCount)

      const result = await tagRepository.countDocuments()

      expect(mockTagModel.countDocuments).toHaveBeenCalledWith()
      expect(result).toEqual({ count: mockCount })
    })
  })
})
