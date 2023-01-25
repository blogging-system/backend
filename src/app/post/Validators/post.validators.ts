import Joi from "joi";

export default {
	// Queries
	getPostByTitle: Joi.object({
		title: Joi.string().required(),
	}),

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
		limit: Joi.number().positive().min(1).max(10).default(5),
	}),

	getRelatedPosts: Joi.object({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),

	getPostsByTag: Joi.object({
		slug: Joi.string().required(),
		page: Joi.number().positive().min(1).required(),
	}),

	// Mutations
	create: Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		content: Joi.string().required(),
		tags: Joi.string().required(),
		keywords: Joi.array().items(Joi.string().required()).required(),
		imageUrl: Joi.string().uri().required(),
	}),

	update: Joi.object({
		_id: Joi.string().hex().length(24).message("Sorry, Invalid _id"),
		title: Joi.string(),
		description: Joi.string(),
		content: Joi.string(),
		tags: Joi.string(),
		keywords: Joi.array().items(Joi.string().required()),
		imageUrl: Joi.string().uri(),
	}),

	delete: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),

	publish: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId"),
	}),
};
