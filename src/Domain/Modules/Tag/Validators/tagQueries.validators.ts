import Joi from "joi";
import { GetTagBySlugDTO, SuggestTagByNameDTO, GetAllTagsDTO } from "../Types";

export const tagQueriesValidators = {
	suggestTagByName: Joi.object<SuggestTagByNameDTO>({
		name: Joi.string().required(),
		limit: Joi.number().required(),
	}),

	getTagBySlug: Joi.object<GetTagBySlugDTO>({
		slug: Joi.string().required(),
	}),

	getAllTags: Joi.object<GetAllTagsDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
	}),
};
