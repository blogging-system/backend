import Joi from "joi";
import {
	SuggestPostByTitleDTO,
	GetAllPostsDTO,
	GetPostByIdDTO,
	GetPostBySlugDTO,
	GetAllPostsByTagDTO,
	GetAllPostsBySeriesDTO,
	GetAllPostsByKeywordDTO,
	GetRelatedPostsDTO,
} from "../Types";

export const postQueriesValidators = {
	suggestPostByTitle: Joi.object<SuggestPostByTitleDTO>({
		title: Joi.string().required(),
	}),

	getPostBySlug: Joi.object<GetPostBySlugDTO>({
		slug: Joi.string().required(),
	}),

	getPostById: Joi.object<GetPostByIdDTO>({
		_id: Joi.string().hex().length(24).message("Invalid postId"),
	}),

	getAllPosts: Joi.object<GetAllPostsDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
	}),

	getAllPostsByTag: Joi.object<GetAllPostsByTagDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
		tagId: Joi.string().hex().length(24).message("Invalid tagId"),
	}),

	getAllPostsBySeries: Joi.object<GetAllPostsBySeriesDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
		seriesId: Joi.string().hex().length(24).message("Invalid tagId"),
	}),

	getAllPostsByKeywords: Joi.object<GetAllPostsByKeywordDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
		keywordId: Joi.string().hex().length(24).message("Invalid tagId"),
	}),

	getRelatedPosts: Joi.object<GetRelatedPostsDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
		postId: Joi.string().hex().length(24).message("Invalid tagId"),
	}),

	getUnPublishedPosts: Joi.object({
		page: Joi.number().positive().min(1).required(),
	}),
};
