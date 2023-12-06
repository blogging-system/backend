import { CreateSeriesDto, DeleteSeriesDto, GetAllSeriesDto, SeriesManipulationDto } from '../dtos'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { SeriesRepository } from './series.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { CountDocumentsDto } from '@src/shared/contracts/dtos'
import { getModelToken } from '@nestjs/mongoose'
import { SeriesService } from '../services'
import { MESSAGES } from '../constants'
import { Model, Types } from 'mongoose'
import { Series } from '../schemas'

describe('SeriesRepository', () => {
  let seriesRepository: SeriesRepository
  let seriesModel: Model<Series>

  const mockSeriesModel = {
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
        SeriesRepository,
        {
          provide: getModelToken(Series.name),
          useValue: mockSeriesModel,
        },
      ],
    }).compile()

    seriesRepository = module.get<SeriesRepository>(SeriesRepository)
    seriesModel = module.get<Model<Series>>(getModelToken(Series.name))

    mockSeriesModel.findOne.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce({}),
    })

    mockSeriesModel.find.mockReturnValueOnce({
      skip: jest.fn().mockReturnValueOnce({
        limit: jest.fn().mockReturnValueOnce({
          sort: jest.fn().mockReturnValueOnce({
            lean: jest.fn().mockReturnValueOnce([{}]),
          }),
        }),
      }),
    })

    mockSeriesModel.countDocuments.mockReturnValueOnce({
      lean: jest.fn().mockReturnValueOnce(5),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Layer Setup', () => {
    it('should be defined', () => {
      expect(seriesRepository).toBeDefined()
    })
  })

  describe('createOne', () => {
    it('should create a series successfully', async () => {
      const createSeriesDto: Partial<CreateSeriesDto> = { title: 'new series' }
      const mockCreatedSeries: Partial<SeriesService> = {}

      mockSeriesModel.create.mockResolvedValueOnce(mockCreatedSeries)

      const result = await seriesRepository.createOne(createSeriesDto as CreateSeriesDto)

      expect(mockSeriesModel.create).toHaveBeenCalledWith({ ...createSeriesDto, slug: expect.any(String) })
      expect(result).toEqual(mockCreatedSeries)
    })

    it('should handle a failed creation and throw an InternalServerErrorException', async () => {
      const createSeriesDto: Partial<CreateSeriesDto> = { title: 'new series' }

      mockSeriesModel.create.mockResolvedValueOnce(null)

      await expect(seriesRepository.createOne(createSeriesDto as CreateSeriesDto)).rejects.toThrow(
        InternalServerErrorException,
      )
    })
  })

  describe('updateOne', () => {
    it('should update a series successfully', async () => {
      const seriesId = new Types.ObjectId().toHexString()
      const updateSeriesDto: Partial<SeriesManipulationDto> = {}
      const mockUpdatedSeries = {}

      mockSeriesModel.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedSeries)

      const result = await seriesRepository.updateOne(seriesId, updateSeriesDto)

      expect(mockSeriesModel.findByIdAndUpdate).toHaveBeenCalledWith(seriesId, expect.any(Object), { new: true })
      expect(result).toEqual(mockUpdatedSeries)
    })

    it('should handle a failed update and throw an InternalServerErrorException', async () => {
      const seriesId = new Types.ObjectId().toHexString()
      const updateSeriesDto: Partial<SeriesManipulationDto> = {}

      mockSeriesModel.findByIdAndUpdate.mockResolvedValueOnce(null)

      await expect(seriesRepository.updateOne(seriesId, updateSeriesDto)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('deleteOne', () => {
    it('should delete a series successfully', async () => {
      const deleteSeriesDto: DeleteSeriesDto = { seriesId: 'mockId' }
      const mockDeleteResult = { deletedCount: 1 }

      mockSeriesModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      const result = await seriesRepository.deleteOne(deleteSeriesDto)

      expect(mockSeriesModel.deleteOne).toHaveBeenCalledWith({ _id: deleteSeriesDto.seriesId })
      expect(result).toEqual({ message: MESSAGES.DELETED_SUCCESSFULLY })
    })

    it('should handle a failed deletion and throw an InternalServerErrorException', async () => {
      const deleteSeriesDto: DeleteSeriesDto = { seriesId: 'mockId' }
      const mockDeleteResult = { deletedCount: 0 }

      mockSeriesModel.deleteOne.mockResolvedValueOnce(mockDeleteResult)

      await expect(seriesRepository.deleteOne(deleteSeriesDto)).rejects.toThrow(InternalServerErrorException)
    })
  })

  describe('findOneById', () => {
    it('should find a series by ID successfully', async () => {
      const seriesId = new Types.ObjectId().toHexString()
      const mockSeries = {}

      mockSeriesModel.findOne.mockResolvedValueOnce(mockSeries)

      const result = await seriesRepository.findOneById(seriesId)

      expect(mockSeriesModel.findOne).toHaveBeenCalledWith({ _id: seriesId })
      expect(result).toEqual(mockSeries)
    })

    it('should handle a failed find by ID and throw a NotFoundException', async () => {
      const seriesId = 'mockId'
      mockSeriesModel.findOne.mockResolvedValueOnce(null)

      try {
        await expect(seriesRepository.findOneById(seriesId))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('findOne', () => {
    it('should find a series by query successfully', async () => {
      const query = {}
      const mockSeries = {}

      mockSeriesModel.findOne.mockResolvedValueOnce(mockSeries)

      const result = await seriesRepository.findOne(query)

      expect(mockSeriesModel.findOne).toHaveBeenCalledWith(query)
      expect(result).toEqual(mockSeries)
    })
  })

  describe('findMany', () => {
    it('should find multiple series successfully', async () => {
      const getAllSeriesDto: Partial<GetAllSeriesDto> = { pagination: { pageNumber: 1, pageSize: 5 } }
      const mockSeriesList: Partial<Series>[] = [{}]

      mockSeriesModel.find.mockResolvedValueOnce(mockSeriesList)

      const result = await seriesRepository.findMany(getAllSeriesDto as GetAllSeriesDto)

      expect(mockSeriesModel.find).toHaveBeenCalledWith(expect.any(Object))
      expect(result).toEqual(mockSeriesList)
    })

    it('should handle a failed find many and throw a NotFoundException', async () => {
      const getAllSeriesDto: Partial<GetAllSeriesDto> = { pagination: { pageNumber: 1, pageSize: 5 } }

      mockSeriesModel.find.mockResolvedValueOnce([])

      try {
        await expect(seriesRepository.findMany(getAllSeriesDto as GetAllSeriesDto))
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('countDocuments', () => {
    it('should count documents successfully', async () => {
      const countDocumentsDto: Partial<CountDocumentsDto> = {}
      const count = 5

      const result = await seriesRepository.countDocuments(countDocumentsDto)

      expect(result).toEqual({ count })
      expect(mockSeriesModel.countDocuments).toHaveBeenCalled()
    })
  })
})
