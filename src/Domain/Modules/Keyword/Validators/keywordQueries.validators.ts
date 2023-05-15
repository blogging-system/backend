import Joi from "joi";
import { SuggestKeywordByNameDTO } from "../Types";

export const keywordQueriesValidators = {
	suggestKeywordByName: Joi.object<SuggestKeywordByNameDTO>({
		name: Joi.string().required(),
		limit: Joi.number().required(),
	}),
};
