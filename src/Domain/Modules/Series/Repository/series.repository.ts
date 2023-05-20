import seriesModel from "../Model/series.model";
import { BaseRepository } from "../../../Repository";
import { FilterQuery } from "mongoose";
import slugify from "slugify";

class SeriesRepository extends BaseRepository<any> {
	constructor() {
		super(seriesModel);
	}

	async createOne(payload: any): Promise<any> {
		if (payload.title) {
			payload.slug = slugify(payload.title);
		}

		return await super.createOne(payload);
	}

	async findOne(query: FilterQuery<any>): Promise<any> {
		// TODO: add "Keywords image" to populate
		return await this.model.findOne(query).populate("").lean();
	}

	async findMany(query: FilterQuery<any>, limit = 10): Promise<any[]> {
		return await this.model.find(query).populate("").limit(limit).lean();
	}

	async updateOne(filter, setPayload, unsetPayload?: any) {
		if (setPayload.title) {
			setPayload.slug = slugify(setPayload.title);
		}

		return await super.updateOne(filter, setPayload, unsetPayload);
	}
}

export default new SeriesRepository();
