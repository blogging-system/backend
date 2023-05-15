import Joi from "joi";
import { GetAllKeywordsDTO, SuggestKeywordByNameDTO } from "../Types";

export const keywordQueriesValidators = {
	suggestKeywordByName: Joi.object<SuggestKeywordByNameDTO>({
		name: Joi.string().required(),
		limit: Joi.number().required(),
	}),

	getAllKeywords: Joi.object<GetAllKeywordsDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
	}),
};
