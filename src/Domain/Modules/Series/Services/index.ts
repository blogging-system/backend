import { CreateSeriesDTO } from "../Types/seriesMutations.dtos";
import SeriesMutationServices from "./seriesMutations.services";

export default class SeriesServices {
	public static async createSeries(payload: CreateSeriesDTO) {
		return await SeriesMutationServices.createSeries(payload);
	}
}
