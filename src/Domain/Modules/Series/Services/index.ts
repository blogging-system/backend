import {
	AddOrRemoveTagFromSeriesDTO,
	AddOrRemoveKeywordFromSeriesDTO,
	CreateSeriesDTO,
	DeleteSeriesDTO,
	PublishSeriesDTO,
	UpdateSeriesDTO,
} from "../Types/seriesMutations.dtos";
import SeriesMutationServices from "./seriesMutations.services";

export default class SeriesServices {
	public static async createSeries(data: CreateSeriesDTO) {
		return await SeriesMutationServices.createSeries(data);
	}

	public static async updateSeries(data: UpdateSeriesDTO) {
		return await SeriesMutationServices.updateSeries(data);
	}

	public static async publishedSeries(data: PublishSeriesDTO) {
		return await SeriesMutationServices.publishSeries(data);
	}

	public static async deleteSeries(data: DeleteSeriesDTO) {
		return await SeriesMutationServices.deleteSeries(data);
	}

	public static async addTagToSeries(data: AddOrRemoveTagFromSeriesDTO) {
		return await SeriesMutationServices.addTagToSeries(data);
	}

	public static async removeTagFromSeries(data: AddOrRemoveTagFromSeriesDTO) {
		return await SeriesMutationServices.removeTagFromSeries(data);
	}

	public static async addKeywordToSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		return await SeriesMutationServices.addKeywordToSeries(data);
	}
}
