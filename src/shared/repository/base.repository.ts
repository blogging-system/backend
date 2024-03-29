import { FilterQuery, Model, PipelineStage, PopulateOptions, Query, UpdateQuery } from "mongoose";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ResultMessage } from "@src/shared/contracts/types";
import { BaseSchema } from "../schemas";

export abstract class BaseRepository<TDocument extends BaseSchema> {
  constructor(protected readonly model: Model<TDocument>) {}

  public async createOne(payload: Omit<Partial<TDocument>, "_id">): Promise<TDocument> {
    const createdDocument: TDocument = await this.model.create(payload);

    if (!createdDocument)
      throw new InternalServerErrorException(
        `The process of creating a new ${this.model.modelName.toLowerCase()} has failed!`,
      );

    return createdDocument;
  }

  public async updateOne(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument> {
    const updatedDocument = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);

    if (!updatedDocument) throw new NotFoundException(`The ${this.model.modelName.toLowerCase()} is not found!`);

    return updatedDocument;
  }

  public async deleteOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const deletedDocument = await this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);

    if (!deletedDocument) throw new NotFoundException(`The ${this.model.modelName.toLowerCase()} is not found!`);

    return deletedDocument;
  }

  async delete(filterQuery: FilterQuery<TDocument>): Promise<ResultMessage> {
    const result = await this.model.deleteMany(filterQuery);

    if (result.deletedCount === 0)
      throw new NotFoundException(`The ${this.model.modelName.toLowerCase()}s are not found!`);

    return { message: `All ${this.model.modelName.toLowerCase()}s are deleted successfully!` };
  }

  public async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    return await this.model.findOne(filterQuery).lean<TDocument>(true);
  }

  public async findOneWithPopulate(
    filterQuery: FilterQuery<TDocument>,
    paths: string[],
    models: string[],
  ): Promise<TDocument | null> {
    const document = await this.model.findOne(filterQuery).lean<TDocument>(true);

    if (!document) return null;

    const populatedDocument = await this.populate([document], paths, models);

    return populatedDocument[0];
  }

  public async isFound(filterQuery: FilterQuery<TDocument>): Promise<boolean> {
    return !!(await this.model.findOne(filterQuery).lean<TDocument>(true));
  }

  public async find(
    filterQuery: FilterQuery<TDocument>,
    options?: {
      sort?: Record<string, any>;
      skip?: number;
      limit?: number;
      populate?: PopulateOptions | (string | PopulateOptions)[];
    },
  ): Promise<TDocument[]> {
    let query: Query<TDocument[], TDocument> = this.model.find(filterQuery);

    if (options) {
      if (options.sort) query = query.sort(options.sort);
      if (options.skip) query = query.skip(options.skip);
      if (options.limit) query = query.limit(options.limit);
      if (options.populate) query = query.populate(options.populate);
    }

    const foundDocuments = await query.lean<TDocument[]>(true);

    if (foundDocuments.length === 0)
      throw new NotFoundException(`The ${this.model.modelName.toLowerCase()}s are not found!`);

    return foundDocuments;
  }

  async countDocuments(filterQuery: FilterQuery<TDocument>): Promise<ResultMessage> {
    const count = await this.model.countDocuments(filterQuery);

    return { count };
  }

  async aggregate(pipeline: PipelineStage[]): Promise<TDocument[]> {
    const foundDocuments = await this.model.aggregate(pipeline);

    if (foundDocuments.length === 0)
      throw new NotFoundException(`The ${this.model.modelName.toLowerCase()}s are not found!`);

    return foundDocuments;
  }

  async populate(documentsToBePopulated: TDocument[], paths: string[], models: string[]): Promise<TDocument[]> {
    const populateOptions: PopulateOptions | Array<PopulateOptions> | string = paths.map((path, index) => ({
      path,
      model: models[index],
    }));

    return await this.model.populate(documentsToBePopulated, populateOptions);
  }
}
