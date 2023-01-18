import Joi from "joi";
import { join } from "path";

export default {
	// Queries
	getAllSeries: Joi.object({
		limit: Joi.number().positive().min(1).max(10).default(5),
		lastSeriesId: Joi.string()
			.hex()
			.length(24)
			.message("Sorry, Invalid seriesId"),
	}),

	getSeriesBySlug: Joi.object({
		slug: Joi.string().trim().required(),
	}),

	// Mutations
	createSeries: Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		imageUrl: Joi.string().uri().required(),
		keywords: Joi.array().items(Joi.string().required()).required(),
	}),

	deleteOrPublishSeries: Joi.object({
		seriesId: Joi.string()
			.hex()
			.length(24)
			.message("Sorry, Invalid seriesId")
			.required(),
	}),

	addOrRemovePostFromSeries: Joi.object({
		postId: Joi.string()
			.hex()
			.length(24)
			.message("Sorry, Invalid postId")
			.required(),
		seriesId: Joi.string()
			.hex()
			.length(24)
			.message("Sorry, Invalid seriesId")
			.required(),
	}),
};
