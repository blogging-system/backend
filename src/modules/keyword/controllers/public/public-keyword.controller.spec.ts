import { PublicKeywordController } from './public-keyword.controller'
import { KeywordService } from '../../services/keyword.service'
import { Keyword } from '../../schemas/keyword.schema'
import { Test, TestingModule } from '@nestjs/testing'

describe('🏠PublicKeywordController | Controller Layer', () => {
  let publicKeywordController: PublicKeywordController
  let keywordService: Partial<KeywordService>

  beforeEach(async () => {
    keywordService = {
      getAllKeywords: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicKeywordController],
      providers: [
        {
          provide: KeywordService,
          useValue: keywordService,
        },
      ],
    }).compile()

    publicKeywordController = module.get<PublicKeywordController>(PublicKeywordController)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllKeywords', () => {
    it('should get all keywords successfully', async () => {
      const keywords: Keyword[] = [
        { _id: '1', name: 'Keyword 1' },
        { _id: '2', name: 'Keyword 2' },
      ]

      ;(keywordService.getAllKeywords as jest.Mock).mockResolvedValueOnce(keywords)

      const result = await publicKeywordController.getAllKeywords()

      expect(keywordService.getAllKeywords).toHaveBeenCalled()
      expect(result).toEqual(keywords)
    })
  })
})
