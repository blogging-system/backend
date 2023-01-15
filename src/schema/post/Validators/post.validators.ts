import Joi from "joi";

export default {
	create: Joi.object({
		seriesId: Joi.string().hex().length(24).message("Sorry, Invalid seriesId"),
		title: Joi.string().required(),
		description: Joi.string().required(),
		content: Joi.string().required(),
		tags: Joi.string().required(),
		keywords: Joi.array().items(Joi.string().required()).required(),
		imageUrl: Joi.string().required(),
	}),
};
