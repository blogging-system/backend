import { Types } from "mongoose";
import {
	AddOrRemoveTagFromSeriesDTO,
	AddOrRemoveKeywordFromSeriesDTO,
	CreateSeriesDTO,
	DeleteSeriesDTO,
	PublishSeriesDTO,
	UpdateSeriesDTO,
} from "../Types/seriesMutations.dtos";
import SeriesRepository from "../Repository/series.repository";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
export default class SeriesMutationServices {
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

	public static async publishSeries(data: PublishSeriesDTO) {
		const publishedSeries = await SeriesRepository.updateOne(
			{ _id: data._id },
			{ isPublished: true, isPublishedAt: new Date() }
		);

		if (publishedSeries.matchedCount === 0) throw new NotFoundException("The series is not found!");
		if (publishedSeries.modifiedCount === 0) throw new InternalServerException("The series update failed!");

		return "The series is published successfully!";
	}

	public static async deleteSeries(data: DeleteSeriesDTO) {
		// TODO:
		// check if there are any posts in this series!
		// check if there are any other keywords/ tags used in any collection!

		const { deletedCount } = await SeriesRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new NotFoundException("The series is not found!");

		return "The series is deleted successfully!";
	}

	public static async addTagToSeries(data: AddOrRemoveTagFromSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data.seriesId });

		if (!foundSeries) throw new NotFoundException("The series is not found!");
		if (foundSeries.tags.includes(data.tagId)) throw new ForbiddenException("The tag is already added!");

		return await SeriesRepository.addTagToSeries(data);
	}

	public static async removeTagFromSeries(data: AddOrRemoveTagFromSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data.seriesId });

		if (!foundSeries) throw new NotFoundException("The series is not found!");
		if (!foundSeries.tags.includes(data.tagId)) throw new ForbiddenException("The tag is already removed!");

		return await SeriesRepository.removeTagFromSeries(data);
	}

	public static async addKeywordToSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data.seriesId });

		if (!foundSeries) throw new NotFoundException("The series is not found!");
		if (foundSeries.tags.includes(data.keywordId)) throw new ForbiddenException("The keyword is already added!");

		return await SeriesRepository.addKeywordToSeries(data);
	}
}
