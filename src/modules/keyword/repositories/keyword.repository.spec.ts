import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { KeywordRepository } from './keyword.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { MESSAGES } from '../constants'
import { Keyword } from '../schemas'

describe('KeywordRepository', () => {
  let repository: KeywordRepository
  let model: Model<Keyword>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeywordRepository,
        {
          provide: getModelToken(Keyword.name),
          useValue: Model,
        },
      ],
    }).compile()

    repository = module.get<KeywordRepository>(KeywordRepository)
    model = module.get<Model<Keyword>>(getModelToken(Keyword.name))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })

  describe('createOne', () => {
    it('should create a keyword', async () => {
      const expectedResult = {} as Keyword
      jest.spyOn(model, 'create').mockResolvedValueOnce(expectedResult as any)

      const result = await repository.createOne({ name: 'test' })

      expect(result).toEqual(expectedResult)
      expect(model.create).toHaveBeenCalledWith({ name: 'test' })
    })

    it('should throw InternalServerErrorException if keyword creation fails', async () => {
      jest.spyOn(model, 'create').mockRejectedValueOnce(new InternalServerErrorException())

      await expect(repository.createOne({ name: 'test' })).rejects.toThrow(InternalServerErrorException)
      expect(model.create).toHaveBeenCalledWith({ name: 'test' })
    })
  })

  describe('updateOne', () => {
    it('should update a keyword', async () => {
      const expectedResult = {} as Keyword
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(expectedResult)

      const result = await repository.updateOne('someId', { name: 'test' })

      expect(result).toEqual(expectedResult)
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someId', { name: 'test' }, { new: true })
    })

    it('should throw InternalServerErrorException if keyword update fails', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockRejectedValueOnce(new InternalServerErrorException())

      await expect(repository.updateOne('someId', { name: 'test' })).rejects.toThrow(InternalServerErrorException)
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someId', { name: 'test' }, { new: true })
    })
  })

  describe('deleteOne', () => {
    it('should delete a keyword and return success message', async () => {
      const keywordId = new Types.ObjectId().toHexString()

      jest.spyOn(repository['keywordModel'], 'deleteOne').mockResolvedValue({ deletedCount: 1 } as any)

      const result = await repository.deleteOne(keywordId)

      expect(result.message).toBe(MESSAGES.DELETED_SUCCESSFULLY)
    })

    it('should throw InternalServerErrorException if deleteOne operation fails', async () => {
      const keywordId = new Types.ObjectId().toHexString()

      jest.spyOn(repository['keywordModel'], 'deleteOne').mockResolvedValue({ deletedCount: 0 } as any)

      await expect(repository.deleteOne(keywordId)).rejects.toThrow(InternalServerErrorException)
    })

    it('should throw InternalServerErrorException if the keyword is not found', async () => {
      const keywordId = new Types.ObjectId().toHexString()

      jest.spyOn(repository['keywordModel'], 'deleteOne').mockResolvedValue({ deletedCount: 0 } as any)

      await expect(repository.deleteOne(keywordId)).rejects.toThrow(InternalServerErrorException)
    })
  })
  describe('findOneById', () => {
    it('should find a keyword by ID', async () => {
      const expectedResult = {} as Keyword
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(expectedResult)

      const result = await repository.findOneById('someId')

      expect(result).toEqual(expectedResult)
      expect(model.findOne).toHaveBeenCalledWith({ _id: 'someId' })
    })

    it('should throw NotFoundException if keyword is not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null)

      await expect(repository.findOneById('someId')).rejects.toThrow(NotFoundException)
      expect(model.findOne).toHaveBeenCalledWith({ _id: 'someId' })
    })
  })

  describe('findMany', () => {
    it('should find multiple keywords', async () => {
      const expectedResult = [{}] as Keyword[]
      jest.spyOn(model, 'find').mockResolvedValueOnce(expectedResult)

      const result = await repository.findMany()

      expect(result).toEqual(expectedResult)
      expect(model.find).toHaveBeenCalledWith()
    })

    it('should throw NotFoundException if no keywords are found', async () => {
      jest.spyOn(model, 'find').mockResolvedValueOnce([])

      await expect(repository.findMany()).rejects.toThrow(NotFoundException)
      expect(model.find).toHaveBeenCalledWith()
    })
  })

  describe('countDocuments', () => {
    it('should return the count of keywords', async () => {
      jest.spyOn(model, 'countDocuments').mockResolvedValueOnce(5)

      const result = await repository.countDocuments()

      expect(result).toEqual({ count: 5 })
      expect(model.countDocuments).toHaveBeenCalledWith()
    })
  })
})
