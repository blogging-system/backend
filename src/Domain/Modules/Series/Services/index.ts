import {
	AddOrRemoveTagFromSeriesDTO,
	AddOrRemoveKeywordFromSeriesDTO,
	CreateSeriesDTO,
	DeleteSeriesDTO,
	PublishSeriesDTO,
	UpdateSeriesDTO,
	deleteSeriesIfNotReferencedInOtherPostsDTO,
} from "../Types/seriesMutations.dtos";
import { GetSeriesByIdDTO, GetSeriesBySlugDTO, SuggestSeriesByTitleDTO } from "../Types/seriesQueries.dtos";
import SeriesMutationsServices from "./seriesMutations.services";
import SeriesQueriesServices from "./seriesQueries.services";

export default class SeriesServices {
	public static async createSeries(data: CreateSeriesDTO) {
		return await SeriesMutationsServices.createSeries(data);
	}

	public static async updateSeries(data: UpdateSeriesDTO) {
		return await SeriesMutationsServices.updateSeries(data);
	}

	public static async publishedSeries(data: PublishSeriesDTO) {
		return await SeriesMutationsServices.publishSeries(data);
	}

	public static async deleteSeries(data: DeleteSeriesDTO) {
		return await SeriesMutationsServices.deleteSeries(data);
	}

	public static async deleteSeriesIfNotReferencedInOtherPosts(data: deleteSeriesIfNotReferencedInOtherPostsDTO) {
		return await SeriesMutationsServices.deleteSeriesIfNotReferencedInOtherPosts(data);
	}

	public static async addTagToSeries(data: AddOrRemoveTagFromSeriesDTO) {
		return await SeriesMutationsServices.addTagToSeries(data);
	}

	public static async removeTagFromSeries(data: AddOrRemoveTagFromSeriesDTO) {
		return await SeriesMutationsServices.removeTagFromSeries(data);
	}

	public static async addKeywordToSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		return await SeriesMutationsServices.addKeywordToSeries(data);
	}

	public static async removeKeywordFromSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		return await SeriesMutationsServices.removeKeywordFromSeries(data);
	}

	public static async suggestSeriesByTitle(data: SuggestSeriesByTitleDTO) {
		return await SeriesQueriesServices.suggestSeriesByTitle(data);
	}

	public static async getSeriesBySlug(data: GetSeriesBySlugDTO) {
		return await SeriesQueriesServices.getSeriesBySlug(data);
	}

	public static async getSeriesById(data: GetSeriesByIdDTO) {
		return await SeriesQueriesServices.getSeriesById(data);
	}
}
