import { CreateSeriesDTO, DeleteSeriesDTO, PublishSeriesDTO, UpdateSeriesDTO } from "../Types/seriesMutations.dtos";
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
}
