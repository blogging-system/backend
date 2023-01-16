import Joi from "joi";

export default {
	// Queries
	getPostBySlug: Joi.object({
		slug: Joi.string().required(),
	}),
	getPostById: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),
	getAllPosts: Joi.object({
		lastPostId: Joi.string()
			.hex()
			.length(24)
			.message("Sorry, Invalid lastPostId"),
		limit: Joi.number().positive().max(10).default(5),
	}),

	// Mutations
	create: Joi.object({
		seriesId: Joi.string().hex().length(24).message("Sorry, Invalid seriesId"),
		title: Joi.string().required(),
		description: Joi.string().required(),
		content: Joi.string().required(),
		tags: Joi.string().required(),
		keywords: Joi.array().items(Joi.string().required()).required(),
		imageUrl: Joi.string().required(),
	}),

	update: Joi.object({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id"),
		seriesId: Joi.string().hex().length(24).message("Sorry, Invalid seriesId"),
		title: Joi.string(),
		description: Joi.string(),
		content: Joi.string(),
		tags: Joi.string(),
		keywords: Joi.array().items(Joi.string().required()),
		imageUrl: Joi.string(),
	}),

	delete: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),

	publish: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),
};