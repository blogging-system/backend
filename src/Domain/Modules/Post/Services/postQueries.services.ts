import { Types } from "mongoose";
import { NotFoundException } from "../../../../Shared/Exceptions";
import Post from "../Model/post.model";
import {
	SuggestPostByTitleDTO,
	GetAllPostsDTO,
	GetPostByIdDTO,
	GetPostBySlugDTO,
	GetAllPostsByTagDTO,
	GetAllPostsBySeriesDTO,
	GetRelatedPostsDTO,
	GetUnPublishedPostsDTO,
} from "../Types";
import PostRepository from "../Repository/post.repository";
import ViewsTrackerServices from "../../ViewsTracker/Services";

export default class PostQueriesServices {
	public static async suggestPostByTitle(data: SuggestPostByTitleDTO) {
		const matchedPosts = await PostRepository.aggregate([
			{ $search: { index: "suggestPostByTitle", autocomplete: { query: data.title, path: "title" } } },
			{ $match: { isPublished: true } },
			{ $limit: 5 },
			{ $project: { title: 1, slug: 1 } },
		]);

		if (matchedPosts.length < 1) throw new NotFoundException("Not matched posts found!");

		return matchedPosts;
	}

	public static async getPostBySlug(data: GetPostBySlugDTO) {
		const matchedPost = await PostRepository.findOne({ slug: data.slug, isPublished: true });

		if (!matchedPost) throw new NotFoundException("The post is not found!");

		await ViewsTrackerServices.increment({ target: matchedPost._id, targetType: "Post" });

		return matchedPost;
	}

	public static async getPostById(data: GetPostByIdDTO) {
		const matchedPost = await PostRepository.findOne({ _id: data._id, isPublished: true });

		if (!matchedPost) throw new NotFoundException("The post is not found!");

		return matchedPost;
	}

	public static async getAllPosts(data: GetAllPostsDTO) {
		const { pageSize, pageNumber, sort } = data;

		const matchedPosts = await PostRepository.aggregate([
			{ $match: { isPublished: true } },
			{ $sort: { isPublishedAt: sort } },
			{ $skip: pageSize * (pageNumber - 1) },
			{ $limit: pageSize },
		]);

		if (matchedPosts.length == 0) throw new NotFoundException("No posts found!");

		return matchedPosts;
	}

	public static async getAllPostsByTag(data: GetAllPostsByTagDTO) {
		const { pageSize, pageNumber, sort, tagId } = data;

		const matchedPosts = await PostRepository.aggregate([
			{ $match: { isPublished: true, tags: { $in: [new Types.ObjectId(tagId)] } } },
			{ $sort: { isPublishedAt: sort } },
			{ $skip: pageSize * (pageNumber - 1) },
			{ $limit: pageSize },
		]);

		if (matchedPosts.length == 0) throw new NotFoundException("No posts found!");

		return matchedPosts;
	}

	public static async getAllPostsBySeries(data: GetAllPostsBySeriesDTO) {
		const { pageSize, pageNumber, sort, seriesId } = data;

		const matchedPosts = await PostRepository.aggregate([
			{ $match: { isPublished: true, series: { $in: [new Types.ObjectId(seriesId)] } } },
			{ $sort: { isPublishedAt: sort } },
			{ $skip: pageSize * (pageNumber - 1) },
			{ $limit: pageSize },
		]);

		if (matchedPosts.length == 0) throw new NotFoundException("No posts found!");

		return matchedPosts;
	}

	public static async getAllPostsByKeywords(data) {
		const { pageSize, pageNumber, sort, keywordId } = data;

		const matchedPosts = await PostRepository.aggregate([
			{ $match: { isPublished: true, keywords: { $in: [new Types.ObjectId(keywordId)] } } },
			{ $sort: { isPublishedAt: sort } },
			{ $skip: pageSize * (pageNumber - 1) },
			{ $limit: pageSize },
		]);

		if (matchedPosts.length == 0) throw new NotFoundException("No posts found!");

		return matchedPosts;
	}

	public static async getRelatedPosts(data: GetRelatedPostsDTO) {
		const { pageSize, pageNumber, sort, postId } = data;

		const post = await PostRepository.findOne({ _id: postId });

		if (!post) throw new NotFoundException("The post is not found!");

		const matchedPosts = await PostRepository.aggregate([
			{
				$match: {
					$or: [
						{
							isPublished: true,
							tags: { $all: post.tags || [] },
							keywords: { $all: post.keywords || [] },
							series: { $all: post.series || [] },
						},
						{
							isPublished: true,
							tags: { $in: post.tags || [] },
							keywords: { $in: post.keywords || [] },
							series: { $in: post.series || [] },
						},
					],
				},
			},
			{ $sort: { isPublishedAt: sort } },
			{ $skip: pageSize * (pageNumber - 1) },
			{ $limit: pageSize },
		]);

		if (matchedPosts.length == 0) throw new NotFoundException("No posts found!");

		return matchedPosts;
	}

	public static async getPopularPosts(data) {
		// TODO work on this with view model!
		return await Post.find({ isPublished: true }).sort({ views: -1 }).limit(8).lean();
	}

	public static async getUnPublishedPosts(data: GetUnPublishedPostsDTO) {
		console.log({ data });

		const { pageSize, pageNumber } = data;
		const matchedPosts = await PostRepository.aggregate([
			{ $match: { isPublished: false } },
			{ $sort: { createdAt: -1 } },
			{ $skip: pageSize * (pageNumber - 1) },
			{ $limit: pageSize },
		]);

		if (matchedPosts.length == 0) throw new NotFoundException("No posts found!");

		return matchedPosts;
	}
}
