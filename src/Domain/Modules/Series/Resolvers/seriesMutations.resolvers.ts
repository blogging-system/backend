import validateInput from "../../../../Shared/Helpers/validateInput";
import { handleHttpSuccessResponse } from "../../../../Shared/Http";
import SeriesServices from "../Services";
import { CreateSeriesDTO, DeleteSeriesDTO, UpdateSeriesDTO } from "../Types/seriesMutations.dtos";
import SeriesValidators from "../Validators";

export const seriesMutationsResolvers = {
	createSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.createSeries, args.data as CreateSeriesDTO);

		return await SeriesServices.createSeries(validatedData);
	},

	updateSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.updateSeries, args.data as UpdateSeriesDTO);

		return await SeriesServices.updateSeries(validatedData);
	},

	deleteSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.deleteSeries, args.data as DeleteSeriesDTO);

		const message = await SeriesServices.deleteSeries(validatedData);

		return handleHttpSuccessResponse("SERIES_DELETED", message);
	},
};
