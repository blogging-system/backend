import Joi from "joi";

export default {
	// Queries

	// Mutations
	createSeries: Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		imageUrl: Joi.string().uri().required(),
		keywords: Joi.array().items(Joi.string().required()).required(),
	}),

	deleteSeries: Joi.object({
		seriesId: Joi.string().hex().length(24).message("Sorry, Invalid seriesId").required(),
	}),

	addOrRemovePostFromSeries: Joi.object({
		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId").required(),
		seriesId: Joi.string().hex().length(24).message("Sorry, Invalid seriesId").required(),
	}),
};
