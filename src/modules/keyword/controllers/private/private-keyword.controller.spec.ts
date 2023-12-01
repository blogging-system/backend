import { PrivateKeywordController } from './private-keyword.controller'
import { ProtectResourceInterceptor } from '@src/shared/interceptors'
import { KeywordService } from '../../services/keyword.service'
import { Keyword } from '../../schemas/keyword.schema'
import { Test, TestingModule } from '@nestjs/testing'
import { ResultMessage } from '@src/shared/types'
import { CreateKeywordDto } from '../../dtos'

describe('PrivateKeywordController', () => {
  let privateKeywordController: PrivateKeywordController
  let keywordService: Partial<KeywordService>

  beforeEach(async () => {
    keywordService = {
      createKeyword: jest.fn(),
      updateKeyword: jest.fn(),
      deleteKeyword: jest.fn(),
      getAllKeywordsCount: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrivateKeywordController],
      providers: [
        {
          provide: KeywordService,
          useValue: keywordService,
        },
      ],
    })
      .overrideInterceptor(ProtectResourceInterceptor)
      .useValue({
        intercept: jest.fn().mockImplementation((_, next) => next.handle()),
      })
      .compile()

    privateKeywordController = module.get<PrivateKeywordController>(PrivateKeywordController)
  })

  describe('createKeyword method', () => {
    it('should create a keyword successfully', async () => {
      const createKeywordDto: CreateKeywordDto = { name: 'Test Keyword' }
      const createdKeyword: Keyword = Object.assign(createKeywordDto)

      ;(keywordService.createKeyword as jest.Mock).mockResolvedValueOnce(createdKeyword)

      const result = await privateKeywordController.createKeyword(createKeywordDto)

      expect(keywordService.createKeyword).toHaveBeenCalledWith(createKeywordDto)
      expect(result).toEqual(createdKeyword)
    })
  })

  describe('updateKeyword method', () => {
    it('should update a keyword successfully', async () => {
      const keywordId = '1'
      const updateKeywordDto: CreateKeywordDto = { name: 'Updated Keyword' }
      const updatedKeyword: Keyword = Object.assign(updateKeywordDto)

      ;(keywordService.updateKeyword as jest.Mock).mockResolvedValueOnce(updatedKeyword)

      const result = await privateKeywordController.updateKeyword(keywordId, updateKeywordDto)

      expect(keywordService.updateKeyword).toHaveBeenCalledWith(keywordId, updateKeywordDto)
      expect(result).toEqual(updatedKeyword)
    })
  })

  describe('deleteKeyword method', () => {
    it('should delete a keyword successfully', async () => {
      const keywordId = '1'
      const deleteResult: ResultMessage = { message: '' }

      ;(keywordService.deleteKeyword as jest.Mock).mockResolvedValueOnce(deleteResult)

      const result = await privateKeywordController.deleteKeyword(keywordId)

      expect(keywordService.deleteKeyword).toHaveBeenCalledWith(keywordId)
      expect(result).toEqual(deleteResult)
    })
  })

  describe('getAllKeywordsCount method', () => {
    it('should get the count of all keywords successfully', async () => {
      const keywordCountResult: ResultMessage = { message: '' }

      ;(keywordService.getAllKeywordsCount as jest.Mock).mockResolvedValueOnce(keywordCountResult)

      const result = await privateKeywordController.getAllKeywordsCount()

      expect(keywordService.getAllKeywordsCount).toHaveBeenCalled()
      expect(result).toEqual(keywordCountResult)
    })
  })
})
