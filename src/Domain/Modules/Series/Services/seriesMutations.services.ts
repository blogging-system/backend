import {
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
import KeywordServices from "../../Keyword/Services";
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
		const foundSeries = await SeriesRepository.findOne({ _id: data._id });

		if (!foundSeries) throw new NotFoundException("The series is not found!");

		console.log({ foundSeries });

		const referencedPosts = await PostRepository.findMany({ tags: { $in: foundSeries._id } });
		console.log({ referencedPosts });

		if (referencedPosts.length != 0)
			throw new ForbiddenException("You need to delete the posts referencing this series first!");

		const foundSeriesTagsList = foundSeries.tags.map((tag) => tag._id);
		const foundSeriesKeywordsList = foundSeries.keywords.map((keyword) => keyword._id);

		await TagServices.deleteTagsIfNotReferencedInOtherPostsOrSeries({ tags: foundSeriesTagsList });
		await KeywordServices.deleteKeywordsIfNotReferencedInOtherPostsOrSeries({ keywords: foundSeriesKeywordsList });
		console.log("here");
		// const { deletedCount } = await SeriesRepository.deleteOne({ _id: data._id });
		//
		// if (deletedCount === 0) throw new NotFoundException("The series is not found!");

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
}
