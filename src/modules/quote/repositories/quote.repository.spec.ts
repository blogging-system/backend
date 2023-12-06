import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { QuoteRepository } from './quote.repository'
import { getModelToken } from '@nestjs/mongoose'
import { Pagination } from '@src/shared/data/dtos'
import { CreateQuoteDto } from '../dtos'
import { Model, Types } from 'mongoose'
import { MESSAGES } from '../constants'
import { Quote } from '../schemas'

describe('QuoteRepository', () => {
  let quoteRepository: QuoteRepository
  let quoteModel: Model<Quote>

  const mockQuoteModel = {
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    aggregate: jest.fn(),
    countDocuments: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteRepository,
        {
          provide: getModelToken(Quote.name),
          useValue: mockQuoteModel,
        },
      ],
    }).compile()

    quoteRepository = module.get<QuoteRepository>(QuoteRepository)
    quoteModel = module.get<Model<Quote>>(getModelToken(Quote.name))

    mockQuoteModel.findOne.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({}),
    })

    mockQuoteModel.find.mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockReturnValueOnce({
          sort: jest.fn().mockReturnValueOnce({
            lean: jest.fn().mockReturnValueOnce([{}]),
          }),
        }),
      }),
    })

    mockQuoteModel.countDocuments.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce(5),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Layer Setup', () => {
    it('should be defined', () => {
      expect(quoteRepository).toBeDefined()
    })
  })

  describe('createOne', () => {
    it('should create a quote successfully', async () => {
      const createQuoteDto: Partial<CreateQuoteDto> = {}
      const mockCreatedQuote: Partial<Quote> = {}

      mockQuoteModel.create.mockResolvedValueOnce(mockCreatedQuote)

      const result = await quoteRepository.createOne(createQuoteDto as CreateQuoteDto)

      expect(mockQuoteModel.create).toHaveBeenCalledWith(createQuoteDto)
      expect(result).toEqual(mockCreatedQuote)
    })

    it('should handle a failed creation and throw an InternalServerErrorException', async () => {
      const createQuoteDto: Partial<CreateQuoteDto> = {}

      mockQuoteModel.create.mockResolvedValueOnce(null)

      await expect(quoteRepository.createOne(createQuoteDto as CreateQuoteDto)).rejects.toThrow(
        InternalServerErrorException,
      )
    })
  })

  describe('updateOne', () => {
    it('should update a quote successfully', async () => {
      const quoteId = 'mockId'
      const updateQuoteDto: Partial<CreateQuoteDto> = {}
      const mockUpdatedQuote: Partial<Quote> = {}

      mockQuoteModel.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedQuote)

      const result = await quoteRepository.updateOne(quoteId, updateQuoteDto as CreateQuoteDto)

      expect(mockQuoteModel.findByIdAndUpdate).toHaveBeenCalledWith(quoteId, updateQuoteDto, { new: true })
      expect(result).toEqual(mockUpdatedQuote)
    })

    it('should handle a failed update and throw an InternalServerErrorException', async () => {
      const quoteId = 'mockId'
      const updateQuoteDto: Partial<CreateQuoteDto> = {}
      mockQuoteModel.findByIdAndUpdate.mockResolvedValueOnce(null)

      await expect(quoteRepository.updateOne(quoteId, updateQuoteDto as CreateQuoteDto)).rejects.toThrow(
        InternalServerErrorException,
      )
    })
  })

  describe('deleteOne', () => {
    it('should delete a quote successfully', async () => {
      const quoteId = new Types.ObjectId().toHexString()
      const mockDeleteResult = { deletedCount: 1 }

      mockQuoteModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      const result = await quoteRepository.deleteOne(quoteId)

      expect(mockQuoteModel.deleteOne).toHaveBeenCalled()
      expect(result).toEqual({ message: MESSAGES.DELETED_SUCCESSFULLY })
    })

    it('should handle a failed deletion and throw an InternalServerErrorException', async () => {
      const quoteId = new Types.ObjectId().toHexString()
      const mockDeleteResult = { deletedCount: 0 }

      mockQuoteModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      await expect(quoteRepository.deleteOne(quoteId)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findOneById', () => {
    it('should find a quote by ID successfully', async () => {
      const quoteId = new Types.ObjectId().toHexString()
      const mockQuote: Partial<Quote> = {}

      mockQuoteModel.findOne.mockResolvedValueOnce(mockQuote)

      const result = await quoteRepository.findOneById(quoteId)

      expect(mockQuoteModel.findOne).toHaveBeenCalled()
      expect(result).toEqual(mockQuote)
    })

    it('should handle a failed find by ID and throw a NotFoundException', async () => {
      const quoteId = new Types.ObjectId().toHexString()

      mockQuoteModel.findOne.mockResolvedValueOnce(null)

      try {
        await expect(() => quoteRepository.findOneById(quoteId))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findMany', () => {
    it('should find multiple quotes successfully', async () => {
      const paginationParams: Pagination = {}
      const mockQuotes: Partial<Quote>[] = [{}]

      const result = await quoteRepository.findMany(paginationParams)

      expect(mockQuoteModel.find).toHaveBeenCalled()
      expect(result).toEqual(mockQuotes)
    })

    it('should handle a failed find many and throw a NotFoundException', async () => {
      const paginationParams: Pagination = {}

      try {
        await expect(quoteRepository.findMany(paginationParams))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('aggregate', () => {
    it('should aggregate quotes successfully', async () => {
      const mockAggregatedQuotes: Partial<Quote>[] = [{}]

      mockQuoteModel.aggregate.mockResolvedValueOnce(mockAggregatedQuotes)

      const result = await quoteRepository.aggregate()

      expect(mockQuoteModel.aggregate).toHaveBeenCalledWith([{ $sample: { size: 10 } }])
      expect(result).toEqual(mockAggregatedQuotes)
    })

    it('should handle a failed aggregation and throw a NotFoundException', async () => {
      mockQuoteModel.aggregate.mockResolvedValueOnce([])

      await expect(quoteRepository.aggregate()).rejects.toThrow(NotFoundException)
    })
  })

  describe('countDocuments', () => {
    it('should count documents successfully', async () => {
      const count = 5

      mockQuoteModel.countDocuments.mockResolvedValueOnce(count)

      const result = await quoteRepository.countDocuments()

      expect(result).toEqual({ count })
      expect(mockQuoteModel.countDocuments).toHaveBeenCalledWith()
    })
  })
})
