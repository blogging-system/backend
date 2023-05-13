/* eslint-disable @typescript-eslint/ban-types */
import { Model, Document, QueryOptions, FilterQuery, PipelineStage, UpdateWriteOpResult } from "mongoose";

/**
 * A generic base repository class for MongoDB models that provides common database operations.
 * @template T - The Mongoose model type.
 */
export default class BaseRepository<T extends Document> {
	/**
	 * Constructs a new instance of the BaseRepository class.
	 * @param model - The Mongoose model that the repository will interact with.
	 */
	constructor(public model: Model<T>) {
		this.model = model;
	}
	/**
	 * Creates a new document in the database.
	 *
	 * @param payload - The data for the new document.
	 * @returns The newly created document.
	 */
	async createOne(payload: any): Promise<T> {
		return await this.model.create(payload);
	}

	/**
	 * Creates multiple new documents in the database.
	 *
	 * @param payload - The data for the new documents.
	 * @returns The newly created documents.
	 */
	async createMany(payload: any[]): Promise<T[]> {
		return await this.model.insertMany(payload);
	}

	/**
	 * Finds a single document that matches the provided query.
	 * @param query - The query to use when searching for the document.
	 * @returns A Promise that resolves to the found document, or null if no document was found.
	 */
	async findOne(query: FilterQuery<T>): Promise<T | null> {
		return await this.model.findOne(query).lean();
	}

	/**
	 * Find multiple documents that match the given query.
	 * @param query The query to be executed on the database.
	 * @param limit The maximum number of documents to be returned. Default value is 10.
	 * @returns A promise that resolves to an array of found documents.
	 */
	async findMany(query: FilterQuery<T>, limit = 10): Promise<T[]> {
		return await this.model.find(query).limit(limit).lean();
	}

	/**
	 * Update a document in the collection that matches the given filter.
	 *
	 * @param {object} filter - The filter to apply the update operation.
	 * @param {object} setPayload - The set payload to be updated in the document.
	 * @param {object} unsetPayload - The unset payload to be removed from the document.
	 *
	 * @returns {Promise<UpdateWriteOpResult>} - A Promise that resolves to an object containing the result of the update operation.
	 */
	async updateOne(filter: object, setPayload: object, unsetPayload?: object): Promise<UpdateWriteOpResult> {
		return await this.model.findOneAndUpdate(
			{ ...filter },
			{ $set: { ...setPayload }, $unset: { ...unsetPayload } },
			{ new: true }
		);
	}

	/**
	 * Updates multiple documents that match the filter criteria in the collection.
	 *
	 * @param filter - The filter to apply to the documents to update.
	 * @param setPayload - The fields to update with new values.
	 * @param unsetPayload - The fields to remove from the documents.
	 * @returns A Promise that resolves with the result of the update operation.
	 */
	async updateMany(filter: object, setPayload: object, unsetPayload?: object): Promise<UpdateWriteOpResult> {
		return await this.model.updateMany(
			{ ...filter },
			{ $set: { ...setPayload }, $unset: { ...unsetPayload } },
			{ new: true }
		);
	}

	/**
	 * Deletes a single document from the database that matches the given query.
	 *
	 * @param query - The query to use when searching for the document to delete.
	 * @returns The deleted document.
	 */
	async deleteOne(query: FilterQuery<T>) {
		return await this.model.deleteOne(query);
	}

	/**
	 * Deletes multiple documents from the database that match the given query.
	 *
	 * @param query - The query to use when searching for the documents to delete.
	 * @returns The number of documents deleted.
	 */
	async deleteMany(query: FilterQuery<T>) {
		return await this.model.deleteMany(query);
	}

	/**
	 * Performs an aggregation operation on the database.
	 *
	 * @param pipeline - The aggregation pipeline to use.
	 * @returns A Promise that resolves to an array of documents that result from the aggregation pipeline.
	 */

	async aggregate(pipeline: Array<PipelineStage>) {
		return await this.model.aggregate(pipeline);
	}
}
