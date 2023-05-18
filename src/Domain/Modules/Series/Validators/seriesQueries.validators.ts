import Joi from "joi";
import { SuggestSeriesByTitleDTO } from "../Types/seriesQueries.dtos";

export const seriesQueriesValidators = {
	suggestSeriesByTitle: Joi.object<SuggestSeriesByTitleDTO>({
		title: Joi.string().required(),
	}),
};
