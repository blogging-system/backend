import { CreateSeriesDTO, UpdateSeriesDTO } from "../Types/seriesMutations.dtos";
import SeriesRepository from "../Repository/series.repository";
import { InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
export default class SeriesMutationServices {
	public static async createSeries(payload: CreateSeriesDTO) {
		const createdSeries = await SeriesRepository.createOne(payload);

		if (!createdSeries) throw new InternalServerException("The series creation failed!");

		return createdSeries;
	}

	public static async updateSeries(data: UpdateSeriesDTO) {
		const updatedSeries = await SeriesRepository.updateOne({ _id: data._id }, data.payload);

		if (updatedSeries.matchedCount === 0) throw new NotFoundException("The series is not found!");
		if (updatedSeries.modifiedCount === 0) throw new InternalServerException("The series update failed!");

		return updatedSeries;
	}
}
