import seriesModel from "../Model/series.model";
import { BaseRepository } from "../../../Repository";
import { FilterQuery } from "mongoose";
import slugify from "slugify";

class SeriesRepository extends BaseRepository<any> {
	constructor() {
		super(seriesModel);
	}

	async createOne(payload: any): Promise<any> {
		return await super.createOne({ ...payload, slug: slugify(payload.title) });
	}

	async findOne(query: FilterQuery<any>): Promise<any> {
		// TODO: add "Keywords image" to populate
		return await this.model.findOne(query).populate("tags keywords").lean();
	}

	async findMany(query: FilterQuery<any>, limit = 10): Promise<any[]> {
		return await this.model.find(query).populate("tags keywords").limit(limit).lean();
	}

	async updateOne(filter, setPayload, unsetPayload?: any) {
		return await super.updateOne(filter, { ...setPayload, slug: slugify(setPayload.title) }, unsetPayload);
	}
}

export default new SeriesRepository();
