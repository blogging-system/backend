import Joi from "joi";

export default {
	// Queries
	getAllTags: Joi.object({
		limit: Joi.number().positive().min(1).max(30).default(10),
	}),

	// Mutations
	deleteTag: Joi.object({
		tagId: Joi.string().hex().length(24).message("Sorry, Invalid tagId"),
	}),
};
