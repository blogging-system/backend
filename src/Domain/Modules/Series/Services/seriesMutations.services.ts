import { CreateSeriesDTO, DeleteSeriesDTO, DeleteUnusedSeriesDTO, UpdateSeriesDTO } from "../Types/seriesMutations.dtos";
import SeriesRepository from "../Repository/series.repository";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import PostRepository from "../../Post/Repository/post.repository";

export default class SeriesMutationsServices {
	public static async createSeries(data: CreateSeriesDTO) {
		const createdSeries = await SeriesRepository.createOne(data);

		if (!createdSeries) throw new InternalServerException("The series creation failed!");

		return createdSeries;
	}

	public static async updateSeries(data: UpdateSeriesDTO) {
		const updatedSeries = await SeriesRepository.updateOne({ _id: data._id }, data.payload);

		if (updatedSeries.matchedCount === 0) throw new NotFoundException("The series is not found!");
		if (updatedSeries.modifiedCount === 0) throw new InternalServerException("The series update failed!");

		return updatedSeries;
	}

	public static async deleteSeries(data: DeleteSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data._id });

		if (!foundSeries) throw new NotFoundException("The series is not found!");

		const seriesReferencingPosts = await PostRepository.findMany({ series: { $in: foundSeries._id } });

		if (seriesReferencingPosts.length != 0)
			throw new ForbiddenException("You need to delete the posts referencing this series first!");

		const { deletedCount } = await SeriesRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new NotFoundException("The series is not found!");

		return "The series is deleted successfully!";
	}

	public static async deleteUnusedSeries(data: DeleteUnusedSeriesDTO) {
		const deletePromises = data.series.map(async (series) => {
			const seriesReferencingPosts = await PostRepository.findMany({ series: { $in: series._id } });

			if (seriesReferencingPosts.length === 0) {
				await SeriesRepository.deleteOne({ _id: series._id });
			}
		});

		await Promise.all(deletePromises);
	}
}
