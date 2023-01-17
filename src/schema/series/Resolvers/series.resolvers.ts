import validate from "../../../helpers/validate";
import seriesValidators from "../Validations/series.validators";

import failure from "../../../helpers/handleFailure";

import { createSeries_service } from "../Services/series.mutations.service";

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
	},
};
