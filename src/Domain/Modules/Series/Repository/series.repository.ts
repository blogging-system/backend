import seriesModel from "../Model/series.model";
import { BaseRepository } from "../../../Repository";
import { FilterQuery } from "mongoose";
import slugify from "slugify";
import { AddOrRemoveTagFromSeriesDTO, AddOrRemoveKeywordFromSeriesDTO } from "../Types/seriesMutations.dtos";

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
		return await this.model.findOne(query).populate("tags keywords").lean();
	}

	async findMany(query: FilterQuery<any>, limit = 10): Promise<any[]> {
		return await this.model.find(query).populate("tags keywords").limit(limit).lean();
	}

	async updateOne(filter, setPayload, unsetPayload?: any) {
		if (setPayload.title) {
			setPayload.slug = slugify(setPayload.title);
		}

		return await super.updateOne(filter, setPayload, unsetPayload);
	}

	async addTagToSeries(data: AddOrRemoveTagFromSeriesDTO) {
		return await this.model.findOneAndUpdate(
			{ _id: data.seriesId },
			{
				$addToSet: { tags: data.tagId },
			},
			{ new: true }
		);
	}

	async removeTagFromSeries(data: AddOrRemoveTagFromSeriesDTO) {
		return await this.model.findOneAndUpdate(
			{ _id: data.seriesId },
			{ $pull: { tags: data.tagId } },
			{ new: true }
		);
	}

	async addKeywordToSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		return await this.model.findOneAndUpdate(
			{ _id: data.seriesId },
			{
				$addToSet: { keywords: data.keywordId },
			},
			{ new: true }
		);
	}

	async removeKeywordFromSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		return await this.model.findOneAndUpdate(
			{ _id: data.seriesId },
			{ $pull: { keywords: data.keywordId } },
			{ new: true }
		);
	}
}

export default new SeriesRepository();
