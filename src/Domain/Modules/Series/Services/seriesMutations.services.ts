import {
	AddOrRemoveTagFromSeriesDTO,
	AddOrRemoveKeywordFromSeriesDTO,
	CreateSeriesDTO,
	DeleteSeriesDTO,
	PublishSeriesDTO,
	UpdateSeriesDTO,
	deleteSeriesIfNotReferencedInOtherPostsDTO,
} from "../Types/seriesMutations.dtos";
import SeriesRepository from "../Repository/series.repository";
import { ForbiddenException, InternalServerException, NotFoundException } from "../../../../Shared/Exceptions";
import PostRepository from "../../Post/Repository/post.repository";
import TagServices from "../../Tag/Services";
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
		const foundSeries = await SeriesRepository.findOne({ _id: data._id });

		if (!foundSeries) throw new NotFoundException("The series is not found!");

		const foundPosts = await PostRepository.findMany({ tags: { $in: data._id } });

		if (foundPosts.length != 0)
			throw new ForbiddenException("You need to deleted the posts associated to this series first!");

		const mappedFoundSeries = foundPosts.map(
			(post) =>
				(post = {
					_id: post._id,
				})
		);
		// work on this later!
		// await TagServices.deleteTagsIfNotReferencedInOtherPostsOrSeries({ tags: mappedFoundPosts });

		const { deletedCount } = await SeriesRepository.deleteOne({ _id: data._id });

		if (deletedCount === 0) throw new NotFoundException("The series is not found!");

		return "The series is deleted successfully!";
	}

	public static async deleteSeriesIfNotReferencedInOtherPosts(data: deleteSeriesIfNotReferencedInOtherPostsDTO) {
		const deletePromises = data.series.map(async (series) => {
			const foundPosts = await PostRepository.findMany({ series: series._id });

			if (foundPosts.length <= 1) {
				await SeriesRepository.deleteOne({ _id: series._id });
			}
		});

		await Promise.all(deletePromises);
	}

	public static async addTagToSeries(data: AddOrRemoveTagFromSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data.seriesId });

		if (!foundSeries) throw new NotFoundException("The series is not found!");

		return await SeriesRepository.addTagToSeries(data);
	}

	public static async removeTagFromSeries(data: AddOrRemoveTagFromSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data.seriesId });

		if (!foundSeries) throw new NotFoundException("The series is not found!");

		return await SeriesRepository.removeTagFromSeries(data);
	}

	public static async addKeywordToSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data.seriesId });

		if (!foundSeries) throw new NotFoundException("The series is not found!");

		return await SeriesRepository.addKeywordToSeries(data);
	}

	public static async removeKeywordFromSeries(data: AddOrRemoveKeywordFromSeriesDTO) {
		const foundSeries = await SeriesRepository.findOne({ _id: data.seriesId });

		if (!foundSeries) throw new NotFoundException("The series is not found!");

		const result = await SeriesRepository.removeKeywordFromSeries(data);

		return result;
	}
}
