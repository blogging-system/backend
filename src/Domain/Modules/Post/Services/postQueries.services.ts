import { Types } from "mongoose";
import {
	NotFoundException,
	ForbiddenException,
	UnAuthorizedException,
	ValidationException,
} from "../../../../Shared/Exceptions";
import { GraphQLError } from "graphql";
import Post from "../Model/post.model";
import {
	SuggestPostByTitleDTO,
	GetAllPostsDTO,
	GetPostByIdDTO,
	GetPostBySlugDTO,
	GetAllPostsByTagDTO,
	GetAllPostsBySeriesDTO,
	GetRelatedPostsDTO,
} from "../Types";
import PostRepository from "../Repository/post.repository";

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

		// TODO: increase views!
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
		return await Post.find({ isPublished: true }).sort({ views: -1 }).limit(8).lean();
	}

	// TODO: protect this
	public static async getPublishedPosts(data) {
		// (1) Prepare pagination logic
		const pageNumber = data.page;
		const limit = 8;

		const skip = pageNumber == 1 ? 0 : (pageNumber - 1) * limit;

		// (2) Get posts
		const posts = await Post.find({ isPublished: true })
			.sort({ views: -1 })
			.skip(skip)
			.limit(limit)
			.select("_id title slug views")
			.lean();

		// If No More Posts
		if (posts.length < 1) {
			return new GraphQLError("No More Posts", {
				extensions: { http: { status: 404 } },
			});
		}

		const totalCount = await Post.count({ isPublished: true });

		return {
			posts,
			totalCount,
		};
	}

	// TODO: protect this
	public static async getUnPublishedPosts(data) {
		// (1) Prepare pagination logic
		const pageNumber = data.page;
		const limit = 8;

		const skip = pageNumber == 1 ? 0 : (pageNumber - 1) * limit;

		// (2) Get posts
		const posts = await Post.find({ isPublished: false })
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.select("_id title slug views")
			.lean();

		// If No More Posts
		if (posts.length < 1) {
			return new GraphQLError("No More Posts", {
				extensions: { http: { status: 404 } },
			});
		}

		const totalCount = await Post.count({ isPublished: false });

		return {
			posts,
			totalCount,
		};
	}
}
