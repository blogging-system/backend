import { PublicTagController } from './public-tag.controller'
import { Test, TestingModule } from '@nestjs/testing'
import { TagService } from '../../services'
import { Tag } from '../../schemas'

describe('🌐 PublicTagController | Controller Layer', () => {
  let publicTagController: PublicTagController
  let tagService: TagService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicTagController],
      providers: [
        {
          provide: TagService,
          useValue: {
            getAllTags: jest.fn(),
          },
        },
      ],
    }).compile()

    publicTagController = module.get<PublicTagController>(PublicTagController)
    tagService = module.get<TagService>(TagService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllTags method', () => {
    it('should return all tags', async () => {
      const expectedResult: Tag[] = [
        {
          _id: 'tag1',
          name: 'Tag 1',
        },
        {
          _id: 'tag2',
          name: 'Tag 2',
        },
      ]

      ;(tagService.getAllTags as jest.Mock).mockResolvedValueOnce(expectedResult)

      const result = await publicTagController.getAllTags()

      expect(tagService.getAllTags).toHaveBeenCalled()
      expect(result).toEqual(expectedResult)
    })
  })
})
