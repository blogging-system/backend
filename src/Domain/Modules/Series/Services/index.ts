import {
	CreateSeriesDTO,
	DeleteSeriesDTO,
	DeleteUnusedSeriesDTO,
	UpdateSeriesDTO,
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

	public static async deleteSeries(data: DeleteSeriesDTO) {
		return await SeriesMutationsServices.deleteSeries(data);
	}

	public static async deleteUnusedSeries(data: DeleteUnusedSeriesDTO) {
		return await SeriesMutationsServices.deleteUnusedSeries(data);
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
