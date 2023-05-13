import {
	NotFoundException,
	ForbiddenException,
	UnAuthorizedException,
	ValidationException,
} from "../../../../Shared/Exceptions";
import { GraphQLError } from "graphql";
import Post from "../Model/post.model";
import Tag from "../../Tag/Model/tag.model";
import { SuggestPostByTitleDTO, getAllPostsDTO, getPostByIdDTO, getPostBySlugDTO } from "../Types";
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

	public static async getPostBySlug(data: getPostBySlugDTO) {
		const matchedPost = await PostRepository.findOne({ slug: data.slug, isPublished: true });

		if (!matchedPost) throw new NotFoundException("The post is not found!");

		// TODO: increase views!
		return matchedPost;
	}

	public static async getPostById(data: getPostByIdDTO) {
		const matchedPost = await PostRepository.findOne({ slug: data._id, isPublished: true });

		if (!matchedPost) throw new NotFoundException("The post is not found!");

		return matchedPost;
	}

	public static async getAllPosts(data: getAllPostsDTO) {
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

	public static async getAllPostsByTag(data) {
		const pageNumber = data.page;
		const limit = 8;

		const skip = pageNumber == 1 ? 0 : (pageNumber - 1) * limit;

		const tag = await Tag.findOne({ slug: data.slug }).select("_id").lean();

		// (1) Get posts from DB
		const posts = await Post.find({ tags: { $in: tag._id } })
			.sort({ isPublishedAt: -1 })
			.skip(skip)
			.limit(limit)
			.select("_id title slug imageUrl")
			.lean();

		// If not posts
		if (posts.length == 0 && data.page > 1) {
			return new GraphQLError("No More Posts", {
				extensions: { http: { status: 404 } },
			});
		}

		if (posts.length == 0) {
			return new GraphQLError("No Posts with this tag", {
				extensions: { http: { status: 404 } },
			});
		}

		// Get count of all posts having this tag
		const totalCount = await Post.find({ tags: { $in: tag._id } })
			.select("_id")
			.lean()
			.count();

		// (2) Return found posts
		return { posts, totalCount };
	}

	public static async getAllPostsBySeries(data) {
		//
	}

	public static async getAllPostsByKeywords(data) {
		//
	}

	public static async getRelatedPosts(data) {
		// (1) Find post
		const post = await Post.findOne({ _id: data._id }).select("tags").lean();

		// If not found
		if (!post) {
			return new GraphQLError("Post Not Found", {
				extensions: {
					http: { status: 404 },
				},
			});
		}

		// (2) Get related Posts
		const foundPosts = await Post.find({ tags: { $all: post.tags } })
			.limit(3)
			.select("_id title slug imageUrl")
			.lean();

		// If no related posts
		if (foundPosts.length <= 1) {
			return [];
		}

		// (3) Filter out the current post and return the rest found posts
		return foundPosts.filter((post) => post._id != data._id);
	}

	public static async getLatestPosts(data) {
		const posts = await Post.find({ isPublished: true }).sort({ isPublishedAt: -1 }).limit(8).lean();

		return posts;
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
