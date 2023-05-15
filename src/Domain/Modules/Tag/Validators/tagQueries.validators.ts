import Joi from "joi";
import { GetTagBySlugDTO, SuggestTagByNameDTO } from "../Types";

export const tagQueriesValidators = {
	suggestTagByName: Joi.object<SuggestTagByNameDTO>({
		name: Joi.string().required(),
		limit: Joi.number().required(),
	}),

	getTagBySlug: Joi.object<GetTagBySlugDTO>({
		slug: Joi.string().required(),
	}),
};
