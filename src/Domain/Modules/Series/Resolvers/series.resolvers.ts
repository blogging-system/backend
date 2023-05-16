import validate from "../../../../Shared/Helpers/validateInput";

import seriesValidators from "../Validators/series.validators";
import { handleHttpErrorResponse } from "../../../../Shared/Http";

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
	getSeriesByTitle_service,
} from "../Services/series.queries.service";

export default {
	Query: {
		getAllSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(seriesValidators.getAllSeries, data);

				// (2) Get all series and return them
				return await getAllSeries_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},

		getSeriesBySlug: async (parent, { data }) => {
			try {
				// (1) validate coming data
				const validatedData = await validate(seriesValidators.getSeriesBySlug, data);

				// (2) Get Series document
				return await getSeriesBySlug_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},

		getSeriesByTitle: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(seriesValidators.getSeriesByTitle, data);

				// (2) return the result
				return await getSeriesByTitle_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},
	},

	Mutation: {
		createSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(seriesValidators.createSeries, data);

				// (2) Create series and return it
				return await createSeries_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},

		deleteSeries: async (parent, { data }) => {
			try {
				// (1) validate coming data
				const validatedData = await validate(seriesValidators.deleteOrPublishSeries, data);

				// (2) Delete the series and return messge
				return await deleteSeries_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},

		addPostToSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(seriesValidators.addOrRemovePostFromSeries, data);

				// (2) Add post and return message
				return await addPostToSeries_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},

		removePostFromSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(seriesValidators.addOrRemovePostFromSeries, data);

				// (2) Remove post and return message
				return await removePostFromSeries_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},

		publishSeries: async (parent, { data }) => {
			try {
				// (1) Validate coming data
				const validatedData = await validate(seriesValidators.deleteOrPublishSeries, data);

				// (2) Remove post and return message
				return await publishSeries_service(validatedData);
			} catch (error) {
				return handleHttpErrorResponse(error);
			}
		},
	},
};
