import Joi from "joi";
import { GetSeriesBySlugDTO, SuggestSeriesByTitleDTO } from "../Types/seriesQueries.dtos";

export const seriesQueriesValidators = {
	suggestSeriesByTitle: Joi.object<SuggestSeriesByTitleDTO>({
		title: Joi.string().required(),
	}),

	getSeriesBySlug: Joi.object<GetSeriesBySlugDTO>({
		slug: Joi.string().required(),
	}),
};
