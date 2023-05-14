import tagModel from "../Model/tag.model";
import { BaseRepository } from "../../../Repository";
import { UpdateQuery } from "mongoose";
import slugify from "slugify";

class TagRepository extends BaseRepository<any> {
	constructor() {
		super(tagModel);
	}

	async createOne(payload: any): Promise<any> {
		return await super.createOne({ ...payload, slug: slugify(payload.name) });
	}

	async updateOne(filter, setPayload, unsetPayload?: any) {
		return await super.updateOne(filter, { ...setPayload, slug: slugify(setPayload.name) }, unsetPayload);
	}
}

export default new TagRepository();
