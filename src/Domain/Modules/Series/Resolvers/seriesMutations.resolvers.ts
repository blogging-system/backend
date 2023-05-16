import validateInput from "../../../../Shared/Helpers/validateInput";
import SeriesServices from "../Services";
import { CreateSeriesDTO, PublishSeriesDTO, UpdateSeriesDTO } from "../Types/seriesMutations.dtos";
import SeriesValidators from "../Validators";

export const seriesMutations = {
	createSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.createSeries, args.data as CreateSeriesDTO);

		return await SeriesServices.createSeries(validatedData);
	},

	updateSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.updateSeries, args.data as UpdateSeriesDTO);

		return await SeriesServices.updateSeries(validatedData);
	},

	publishSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.publishSeries, args.data as PublishSeriesDTO);

		return await SeriesServices.publishedSeries(validatedData);
	},
};
