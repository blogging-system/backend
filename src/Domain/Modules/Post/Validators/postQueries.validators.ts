import Joi from "joi";
import { SuggestPostByTitleDTO, getPostByIdDTO, getPostBySlugDTO } from "../Types";

export const postQueriesValidators = {
	suggestPostByTitle: Joi.object<SuggestPostByTitleDTO>({
		title: Joi.string().required(),
	}),

	getPostBySlug: Joi.object<getPostBySlugDTO>({
		slug: Joi.string().required(),
	}),

	getPostById: Joi.object<getPostByIdDTO>({
		_id: Joi.string().hex().length(24).message("Invalid postId"),
	}),

	getAllPosts: Joi.object({
		lastPostId: Joi.string().hex().length(24).message("Sorry, Invalid lastPostId"),
		limit: Joi.number().positive().min(1).max(10).default(5),
	}),

	getRelatedPosts: Joi.object({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),

	getPostsByTag: Joi.object({
		slug: Joi.string().required(),
		page: Joi.number().positive().min(1).required(),
	}),

	getPublishedPosts: Joi.object({
		page: Joi.number().positive().min(1).required(),
	}),

	getUnPublishedPosts: Joi.object({
		page: Joi.number().positive().min(1).required(),
	}),
};
