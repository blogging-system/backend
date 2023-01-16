import Joi from "joi";

export default {
	getPopularTags: Joi.object({
		limit: Joi.number().positive().min(1).max(10).required(),
	}),
};
