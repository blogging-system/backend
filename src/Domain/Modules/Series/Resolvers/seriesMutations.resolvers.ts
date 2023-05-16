import validateInput from "../../../../Shared/Helpers/validateInput";
import SeriesServices from "../Services";
import { CreateSeriesDTO } from "../Types/seriesMutations.dtos";
import SeriesValidators from "../Validators";

export const seriesMutations = {
	createSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.createSeries, args.data as CreateSeriesDTO);

		return await SeriesServices.createSeries(validatedData);
	},
};
