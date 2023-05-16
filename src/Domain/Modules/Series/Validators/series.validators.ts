// import Joi from "joi";

// export default {
// 	// Queries
// 	getAllSeries: Joi.object({
// 		page: Joi.number().positive().min(1),
// 	}),

// 	getSeriesBySlug: Joi.object({
// 		slug: Joi.string().trim().required(),
// 		page: Joi.number().positive().min(1).required(),
// 	}),

// 	getSeriesByTitle: Joi.object({
// 		title: Joi.string().required(),
// 	}),

// 	// Mutations
// 	createSeries: Joi.object({
// 		title: Joi.string().required(),
// 		description: Joi.string().required(),
// 		imageUrl: Joi.string().uri().required(),
// 		keywords: Joi.array().items(Joi.string().required()).required(),
// 	}),

// 	deleteOrPublishSeries: Joi.object({
// 		seriesId: Joi.string().hex().length(24).message("Sorry, Invalid seriesId").required(),
// 	}),

// 	addOrRemovePostFromSeries: Joi.object({
// 		postId: Joi.string().hex().length(24).message("Sorry, Invalid postId").required(),
// 		seriesId: Joi.string().hex().length(24).message("Sorry, Invalid seriesId").required(),
// 	}),
// };
