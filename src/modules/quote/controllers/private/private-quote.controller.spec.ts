import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { PrivateQuoteController } from './private-quote.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { ResultMessage } from '@src/shared/types'
import { Pagination } from '@src/shared/dtos'
import { QuoteService } from '../../services'
import { CreateQuoteDto } from '../../dtos'
import { Quote } from '../../schemas'

describe('🏠PrivateQuoteController | Controller Layer', () => {
  let privateQuoteController: PrivateQuoteController
  let quoteService: QuoteService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateQuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: {
            createQuote: jest.fn(),
            updateQuote: jest.fn(),
            deleteQuote: jest.fn(),
            getAllQuotes: jest.fn(),
          },
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile()

    privateQuoteController = module.get<PrivateQuoteController>(PrivateQuoteController)
    quoteService = module.get<QuoteService>(QuoteService)
  })

  describe('createQuote method', () => {
    it('should create a new quote', async () => {
      const createQuoteDto: CreateQuoteDto = {
        text: 'This is a new quote.',
        author: 'Anonymous',
      }
      const createdQuote: Quote = {
        _id: '1',
        text: 'This is a new quote.',
        author: 'Anonymous',
      }

      ;(quoteService.createQuote as jest.Mock).mockResolvedValueOnce(createdQuote)

      const result = await privateQuoteController.createQuote(createQuoteDto)

      expect(quoteService.createQuote).toHaveBeenCalledWith(createQuoteDto)
      expect(result).toEqual(createdQuote)
    })
  })

  describe('updateQuote method', () => {
    it('should update an existing quote', async () => {
      const quoteId = '1'
      const updateQuoteDto: CreateQuoteDto = {
        text: 'Updated quote content.',
        author: 'Updated Author',
      }
      const updatedQuote: Quote = {
        _id: quoteId,
        text: 'Updated quote content.',
        author: 'Updated Author',
      }

      ;(quoteService.updateQuote as jest.Mock).mockResolvedValueOnce(updatedQuote)

      const result = await privateQuoteController.updateQuote(quoteId, updateQuoteDto)

      expect(quoteService.updateQuote).toHaveBeenCalledWith(quoteId, updateQuoteDto)
      expect(result).toEqual(updatedQuote)
    })
  })

  describe('deleteQuote method', () => {
    it('should delete an existing quote', async () => {
      const quoteId = '1'
      const expectedResult: ResultMessage = { message: 'Quote deleted successfully.' }

      ;(quoteService.deleteQuote as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await privateQuoteController.deleteQuote(quoteId)

      expect(quoteService.deleteQuote).toHaveBeenCalledWith(quoteId)
      expect(result).toEqual(expectedResult)
    })
  })

  describe('getAllQuotes method', () => {
    it('should return all quotes with pagination', async () => {
      const pagination: Pagination = {}
      const expectedQuotes: Quote[] = [
        { _id: '1', text: 'Quote 1', author: 'Author 1' },
        { _id: '2', text: 'Quote 2', author: 'Author 2' },
      ]

      ;(quoteService.getAllQuotes as jest.Mock).mockResolvedValueOnce(expectedQuotes)

      const result = await privateQuoteController.GetAllQuotes(pagination)

      expect(quoteService.getAllQuotes).toHaveBeenCalledWith(pagination)
      expect(result).toEqual(expectedQuotes)
    })
  })
})
