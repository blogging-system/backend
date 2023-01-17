import validate from "../../../helpers/validate";
import seriesValidators from "../Validations/series.validators";

import failure from "../../../helpers/handleFailure";

import {
	createSeries_service,
	deleteSeries_service,
} from "../Services/series.mutations.service";
import { valid } from "joi";

export default {
	Query: {},

	Mutation: {
		createSeries: async (parent, { data }) => {
			try {
				// (1) Validate comming data
				const validatedData = await validate(
					seriesValidators.createSeries,
					data
				);

				// (2) Create series and return it
				return await createSeries_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		deleteSeries: async (parent, { data }) => {
			try {
				// (1) validate comming data
				const validatedData = await validate(
					seriesValidators.deleteSeries,
					data
				);

				// (2) Delete the series and return messge
				return await deleteSeries_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},
	},
};
