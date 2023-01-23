import Joi from "joi";

export default {
	// Queries
	
	// Mutations
	deleteTag: Joi.object({
		tagId: Joi.string().hex().length(24).message("Sorry, Invalid tagId"),
	}),
};
