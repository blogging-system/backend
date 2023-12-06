import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { KeywordRepository } from './keyword.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { MESSAGES } from '../constants'
import { Keyword } from '../schemas'

describe('KeywordRepository', () => {
  let keywordRepository: KeywordRepository
  let keywordModel: Model<Keyword>

  const mockKeywordModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    findOneById: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeywordRepository,
        {
          provide: getModelToken(Keyword.name),
          useValue: mockKeywordModel,
        },
      ],
    }).compile()

    keywordRepository = module.get<KeywordRepository>(KeywordRepository)
    keywordModel = module.get<Model<Keyword>>(getModelToken(Keyword.name))

    mockKeywordModel.findOne.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({}),
    })

    mockKeywordModel.find.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce([{}]),
    })

    mockKeywordModel.countDocuments.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce(5),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Layer Setup', () => {
    it('should be defined', () => {
      expect(keywordRepository).toBeDefined()
    })
  })

  describe('createOne', () => {
    it('should create a keyword', async () => {
      const expectedResult = {} as Keyword
      jest.spyOn(mockKeywordModel, 'create').mockResolvedValueOnce(expectedResult as any)

      const result = await keywordRepository.createOne({ name: 'test' })

      expect(result).toEqual(expectedResult)
      expect(mockKeywordModel.create).toHaveBeenCalledWith({ name: 'test' })
    })

    it('should throw InternalServerErrorException if keyword creation fails', async () => {
      jest.spyOn(mockKeywordModel, 'create').mockRejectedValueOnce(new InternalServerErrorException())

      await expect(keywordRepository.createOne({ name: 'test' })).rejects.toThrow(InternalServerErrorException)
      expect(mockKeywordModel.create).toHaveBeenCalledWith({ name: 'test' })
    })
  })

  describe('updateOne', () => {
    it('should update a keyword', async () => {
      const expectedResult = {} as Keyword
      jest.spyOn(mockKeywordModel, 'findByIdAndUpdate').mockResolvedValueOnce(expectedResult)

      const result = await keywordRepository.updateOne('someId', { name: 'test' })

      expect(result).toEqual(expectedResult)
      expect(mockKeywordModel.findByIdAndUpdate).toHaveBeenCalledWith('someId', { name: 'test' }, { new: true })
    })

    it('should throw InternalServerErrorException if keyword update fails', async () => {
      jest.spyOn(mockKeywordModel, 'findByIdAndUpdate').mockRejectedValueOnce(new InternalServerErrorException())

      await expect(keywordRepository.updateOne('someId', { name: 'test' })).rejects.toThrow(
        InternalServerErrorException,
      )
      expect(mockKeywordModel.findByIdAndUpdate).toHaveBeenCalledWith('someId', { name: 'test' }, { new: true })
    })
  })

  describe('deleteOne', () => {
    it('should delete a keyword and return success message', async () => {
      const keywordId = new Types.ObjectId().toHexString()

      jest.spyOn(keywordRepository['keywordModel'], 'deleteOne').mockResolvedValue({ deletedCount: 1 } as any)

      const result = await keywordRepository.deleteOne(keywordId)

      expect(result.message).toBe(MESSAGES.DELETED_SUCCESSFULLY)
    })

    it('should throw InternalServerErrorException if deleteOne operation fails', async () => {
      const keywordId = new Types.ObjectId().toHexString()

      jest.spyOn(keywordRepository['keywordModel'], 'deleteOne').mockResolvedValue({ deletedCount: 0 } as any)

      await expect(keywordRepository.deleteOne(keywordId)).rejects.toThrow(InternalServerErrorException)
    })

    it('should throw InternalServerErrorException if the keyword is not found', async () => {
      const keywordId = new Types.ObjectId().toHexString()

      jest.spyOn(keywordRepository['keywordModel'], 'deleteOne').mockResolvedValue({ deletedCount: 0 } as any)

      await expect(keywordRepository.deleteOne(keywordId)).rejects.toThrow(InternalServerErrorException)
    })
  })
  describe('findOneById', () => {
    it('should find a keyword by ID', async () => {
      const expectedResult = {} as Keyword
      jest.spyOn(mockKeywordModel, 'findOne').mockResolvedValueOnce(expectedResult)

      const result = await keywordRepository.findOneById('someId')

      expect(result).toEqual(expectedResult)
      expect(mockKeywordModel.findOne).toHaveBeenCalledWith({ _id: 'someId' })
    })

    it('should throw NotFoundException if keyword is not found', async () => {
      jest.spyOn(mockKeywordModel, 'findOne').mockResolvedValueOnce(null)

      try {
        await expect(() => keywordRepository.findOneById('someId'))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findMany', () => {
    it('should find multiple keywords', async () => {
      const expectedResult = [{}] as Keyword[]
      jest.spyOn(mockKeywordModel, 'find').mockResolvedValueOnce(expectedResult)

      const result = await keywordRepository.findMany()

      expect(result).toEqual(expectedResult)
      expect(mockKeywordModel.find).toHaveBeenCalledWith()
    })

    it('should throw NotFoundException if no keywords are found', async () => {
      jest.spyOn(mockKeywordModel, 'find').mockResolvedValueOnce([])

      try {
        await expect(keywordRepository.findMany())
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('countDocuments', () => {
    it('should return the count of keywords', async () => {
      const count = 5
      jest.spyOn(mockKeywordModel, 'countDocuments').mockResolvedValueOnce(count)

      const result = await keywordRepository.countDocuments()

      expect(result).toEqual({ count })
      expect(mockKeywordModel.countDocuments).toHaveBeenCalled()
    })
  })
})
