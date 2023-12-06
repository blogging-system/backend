import { FilterQuery, Model, PipelineStage, PopulateOptions, Query, Types, UpdateQuery } from 'mongoose'
import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { BaseSchema } from '../schemas'
import { ResultMessage } from '../types'

export abstract class BaseRepository<TDocument extends BaseSchema> {
  constructor(protected readonly model: Model<TDocument>) {}

  public async createOne(payload: Omit<TDocument, '_id'>): Promise<TDocument> {
    const documentInstance = new this.model({
      _id: new Types.ObjectId(),
      ...payload,
    })

    const createdDocument = (await documentInstance.save()) as TDocument

    if (!createdDocument)
      throw new InternalServerErrorException(
        `The process of creating a new ${this.model.modelName.toLowerCase()} has failed!`,
      )

    return createdDocument
  }

  public async updateOne(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true)

    if (!updatedDocument) throw new NotFoundException(`The ${this.model.modelName.toLowerCase()} is not found!`)

    return updatedDocument
  }

  public async deleteOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const deletedDocument = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true)

    if (!deletedDocument) throw new NotFoundException(`The ${this.model.modelName.toLowerCase()} is not found!`)

    return deletedDocument
  }

  public async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>(true)

    if (!document) throw new NotFoundException(`The ${this.model.modelName.toLowerCase()} is not found!`)

    return document
  }

  public async find(
    filterQuery: FilterQuery<TDocument>,
    options?: {
      sort?: Record<string, any>
      skip?: number
      limit?: number
      populate?: PopulateOptions | (string | PopulateOptions)[]
    },
  ): Promise<TDocument[]> {
    let query: Query<TDocument[], TDocument> = this.model.find(filterQuery)

    if (options) {
      if (options.sort) query = query.sort(options.sort)
      if (options.skip) query = query.skip(options.skip)
      if (options.limit) query = query.limit(options.limit)
      if (options.populate) query = query.populate(options.populate)
    }

    const foundDocuments = await query.lean<TDocument[]>(true)

    if (foundDocuments.length === 0)
      throw new NotFoundException(`The ${this.model.modelName.toLowerCase()}s are not found!`)

    return foundDocuments
  }

  async countDocuments(filterQuery: FilterQuery<TDocument>): Promise<ResultMessage> {
    const count = await this.model.countDocuments(filterQuery)

    return { count }
  }

  async aggregateWithPopulation(pipeline: PipelineStage[]): Promise<TDocument[]> {
    const foundDocuments = await this.model.aggregate(pipeline)

    if (foundDocuments.length === 0)
      throw new NotFoundException(`The ${this.model.modelName.toLowerCase()}s are not found!`)

    return foundDocuments
  }
}
