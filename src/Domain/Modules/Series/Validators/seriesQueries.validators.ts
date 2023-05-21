import Joi from "joi";
import {
	GetAllSeriesDTO,
	GetSeriesByIdDTO,
	GetSeriesBySlugDTO,
	SuggestSeriesByTitleDTO,
} from "../Types/seriesQueries.dtos";

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

	getAllSeries: Joi.object<GetAllSeriesDTO>({
		pageSize: Joi.number().integer().positive().default(10),
		pageNumber: Joi.number().integer().positive().default(1),
		sort: Joi.number().integer().valid(1, -1).default(1),
	}),
};
