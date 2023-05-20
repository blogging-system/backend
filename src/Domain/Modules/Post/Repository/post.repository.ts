import postModel from "../Model/post.model";
import { BaseRepository } from "../../../Repository";
import { FilterQuery } from "mongoose";
import slugify from "slugify";

class PostRepository extends BaseRepository<any> {
	constructor() {
		super(postModel);
	}

	async createOne(payload: any): Promise<any> {
		if (payload.title) {
			payload.slug = slugify(payload.title);
		}

		return await super.createOne(payload);
	}

	/**
	 * Finds and returns a single document that matches the given query with the populated fields.
	 *
	 * @param {FilterQuery<any>} query - The query used to search for a document.
	 * @returns {Promise<any>} - The promise that resolves to the found document, null if not found.
	 */
	async findOne(query: FilterQuery<any>): Promise<any> {
		// todo: imageId!
		return await this.model.findOne(query).populate("tags series keywords").lean();
	}

	/**
	 * Find multiple documents in the database and populate the `imageId`, `tags`, `series` and `keywords` fields of the returned documents.
	 * @param query - The query to filter the documents.
	 * @param limit - The maximum number of documents to return.
	 * @returns A promise that resolves to an array of documents.
	 */
	async findMany(query: FilterQuery<any>, limit = 10): Promise<any[]> {
		return await this.model.find(query).populate("tags series").limit(limit).lean();
	}

	async updateOne(filter, setPayload, unsetPayload?: any) {
		if (setPayload.title) {
			setPayload.slug = slugify(setPayload.title);
		}

		return await super.updateOne(filter, setPayload, unsetPayload);
	}
}

export default new PostRepository();
