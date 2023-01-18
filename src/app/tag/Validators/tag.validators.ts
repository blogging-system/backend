import Joi from "joi";

export default {
	// Queries
	getAllTags: Joi.object({
		limit: Joi.number().positive().min(1).max(10).default(5),
	}),

	// Mutations
	deleteTag: Joi.object({
		tagId: Joi.string().hex().length(24).message("Sorry, Invalid tagId"),
	}),
};
