import validate from "../../../helpers/validate";
import seriesValidators from "../Validations/series.validators";

import failure from "../../../helpers/handleFailure";

import {
	createSeries_service,
	deleteSeries_service,
	addPostToSeries_service,
	removePostFromSeries_service,
	publishSeries_service,
} from "../Services/series.mutations.service";
import {
	getAllSeries_service,
	getSeriesBySlug_service,
} from "../Services/series.queries.service";

export default {
	Query: {
		getAllSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(
					seriesValidators.getAllSeries,
					data
				);

				// (2) Get all series and return them
				return await getAllSeries_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		getSeriesBySlug: async (parent, { data }) => {
			try {
				// (1) validate coming data
				const validatedData = await validate(
					seriesValidators.getSeriesBySlug,
					data
				);

				// (2) Get Series document
				return await getSeriesBySlug_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},
	},

	Mutation: {
		createSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
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
				// (1) validate coming data
				const validatedData = await validate(
					seriesValidators.deleteOrPublishSeries,
					data
				);

				// (2) Delete the series and return messge
				return await deleteSeries_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		addPostToSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(
					seriesValidators.addOrRemovePostFromSeries,
					data
				);

				// (2) Add post and return message
				return await addPostToSeries_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		removePostFromSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(
					seriesValidators.addOrRemovePostFromSeries,
					data
				);

				// (2) Remove post and return message
				return await removePostFromSeries_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},

		publishSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(
					seriesValidators.deleteOrPublishSeries,
					data
				);

				// (2) Remove post and return message
				return await publishSeries_service(validatedData);
			} catch (error) {
				return failure(error);
			}
		},
	},
};
