import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException } from '@nestjs/common'
import { QuoteRepository } from '../repositories'
import { ResultMessage } from '@src/shared/types'
import { QuoteService } from './quote.service'
import { Pagination } from '@src/shared/dtos'
import { CreateQuoteDto } from '../dtos'
import { Quote } from '../schemas'

describe('🏠QuoteService | Service Layer', () => {
  let quoteService: Partial<QuoteService>
  let quoteRepository: Partial<QuoteRepository>

  beforeEach(async () => {
    quoteRepository = {
      createOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      findOneById: jest.fn(),
      findMany: jest.fn(),
      aggregate: jest.fn(),
    }

    quoteService = {}

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: QuoteRepository,
          useValue: quoteRepository,
        },
      ],
    }).compile()

    quoteService = module.get<QuoteService>(QuoteService)
    quoteRepository = module.get<QuoteRepository>(QuoteRepository)
  })

  describe('createQuote method', () => {
    it('should create a quote successfully', async () => {
      const createQuoteDto: Partial<CreateQuoteDto> = {}
      const mockQuote: Partial<Quote> = {}
      jest.spyOn(quoteRepository, 'createOne').mockResolvedValueOnce(mockQuote as Quote)

      const result = await quoteService.createQuote(createQuoteDto as CreateQuoteDto)

      expect(result).toEqual(mockQuote)
      expect(quoteRepository.createOne).toHaveBeenCalledWith(createQuoteDto)
    })
  })

  describe('updateQuote method', () => {
    it('should update a quote successfully', async () => {
      const quoteId = 'someQuoteId'
      const updateQuoteDto: Partial<CreateQuoteDto> = {}
      const mockQuote: Partial<Quote> = {}

      jest.spyOn(quoteRepository, 'updateOne').mockResolvedValueOnce(mockQuote as Quote)
      jest.spyOn(quoteRepository, 'findOneById').mockResolvedValueOnce(mockQuote as Quote)

      const result = await quoteService.updateQuote(quoteId, updateQuoteDto as CreateQuoteDto)

      expect(result).toEqual(mockQuote)
      expect(quoteRepository.updateOne).toHaveBeenCalledWith(quoteId, updateQuoteDto)
      expect(quoteRepository.findOneById).toHaveBeenCalledWith(quoteId)
    })

    it('should throw NotFoundException if no quote is found for the given quoteId', async () => {
      const quoteId = 'non-existent-quote'

      jest.spyOn(quoteRepository, 'findOneById').mockResolvedValueOnce(null)

      try {
        await expect(quoteService.updateQuote(quoteId, {} as CreateQuoteDto))
        expect(quoteRepository.findOneById).toHaveBeenCalledWith(quoteId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('deleteQuote method', () => {
    it('should delete a quote successfully', async () => {
      const quoteId = 'someQuoteId'
      const mockResultMessage: ResultMessage = {}

      jest.spyOn(quoteRepository, 'deleteOne').mockResolvedValueOnce(mockResultMessage)
      jest.spyOn(quoteRepository, 'findOneById').mockResolvedValueOnce({} as Quote)

      const result = await quoteService.deleteQuote(quoteId)

      expect(result).toEqual(mockResultMessage)
      expect(quoteRepository.deleteOne).toHaveBeenCalledWith(quoteId)
      expect(quoteRepository.findOneById).toHaveBeenCalledWith(quoteId)
    })

    it('should throw NotFoundException if no quote is found for the given quoteId', async () => {
      const quoteId = 'non-existent-quote'

      jest.spyOn(quoteRepository, 'findOneById').mockResolvedValueOnce(null)

      try {
        await expect(quoteService.deleteQuote(quoteId))
        expect(quoteRepository.findOneById).toHaveBeenCalledWith(quoteId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('getAllQuotes method', () => {
    it('should return all quotes', async () => {
      const mockQuotes: Quote[] = []

      jest.spyOn(quoteRepository, 'findMany').mockResolvedValueOnce(mockQuotes as Quote[])

      const result = await quoteService.getAllQuotes({} as Pagination)

      expect(result).toEqual(mockQuotes)
      expect(quoteRepository.findMany).toHaveBeenCalledWith({} as Pagination)
    })
  })

  describe('getRandomQuotes method', () => {
    it('should return random quotes', async () => {
      const mockQuotes: Quote[] = []

      jest.spyOn(quoteRepository, 'aggregate').mockResolvedValueOnce(mockQuotes as Quote[])

      const result = await quoteService.getRandomQuotes()

      expect(result).toEqual(mockQuotes)
      expect(quoteRepository.aggregate).toHaveBeenCalled()
    })
  })
})
