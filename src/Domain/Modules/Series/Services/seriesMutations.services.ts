import { CreateSeriesDTO } from "../Types/seriesMutations.dtos";
import SeriesRepository from "../Repository/series.repository";
import { InternalServerException } from "../../../../Shared/Exceptions";
export default class SeriesMutationServices {
	public static async createSeries(payload: CreateSeriesDTO) {
		const createdSeries = await SeriesRepository.createOne(payload);

		if (!createdSeries) throw new InternalServerException("The series creation failed!");

		return createdSeries;
	}
}
