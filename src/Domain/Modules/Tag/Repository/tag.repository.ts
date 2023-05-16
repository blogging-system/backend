import tagModel from "../Model/tag.model";
import { BaseRepository } from "../../../Repository";
import { UpdateQuery } from "mongoose";
import slugify from "slugify";

class TagRepository extends BaseRepository<any> {
	constructor() {
		super(tagModel);
	}

	async createOne(payload: any): Promise<any> {
		if (payload.name) {
			payload.slug = slugify(payload.name);
		}
		
		return await super.createOne(payload);
	}

	async updateOne(filter, setPayload, unsetPayload?: any) {
		if (setPayload.name) {
			setPayload.slug = slugify(setPayload.name);
		}

		return await super.updateOne(filter, setPayload, unsetPayload);
	}
}

export default new TagRepository();
