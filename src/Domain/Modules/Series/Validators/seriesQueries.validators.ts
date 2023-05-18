import Joi from "joi";
import { GetSeriesByIdDTO, GetSeriesBySlugDTO, SuggestSeriesByTitleDTO } from "../Types/seriesQueries.dtos";

export const seriesQueriesValidators = {
	suggestSeriesByTitle: Joi.object<SuggestSeriesByTitleDTO>({
		title: Joi.string().required(),
	}),

	getSeriesBySlug: Joi.object<GetSeriesBySlugDTO>({
		slug: Joi.string().required(),
	}),

	getSeriesById: Joi.object<GetSeriesByIdDTO>({
		_id: Joi.string().required(),
	}),
};
