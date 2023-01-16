import Joi from "joi";

export default {
	// Queries
	getPopularTags: Joi.object({
		limit: Joi.number().positive().min(1).max(10).required(),
	}),

	// Mutations
	deleteTag: Joi.object({
		tagId: Joi.string().hex().length(24).message("Sorry, Invalid tagId"),
	}),
};
