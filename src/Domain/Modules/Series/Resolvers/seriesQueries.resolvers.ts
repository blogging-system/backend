import SeriesServices from "../Services";
import SeriesValidators from "./../Validators";
import validateInput from "../../../../Shared/Helpers/validateInput";
import { GetSeriesBySlugDTO, SuggestSeriesByTitleDTO } from "../Types/seriesQueries.dtos";

export const seriesQueriesResolvers = {
	suggestSeriesByTitle: async (parent, args, context, info) => {
		const validatedData = await validateInput(
			SeriesValidators.suggestSeriesByTitle,
			args.data as SuggestSeriesByTitleDTO
		);

		return await SeriesServices.suggestSeriesByTitle(validatedData);
	},

	getSeriesBySlug: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.getSeriesBySlug, args.data as GetSeriesBySlugDTO);

		return await SeriesServices.getSeriesBySlug(validatedData);
	},
};
