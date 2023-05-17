import validateInput from "../../../../Shared/Helpers/validateInput";
import { handleHttpSuccessResponse } from "../../../../Shared/Http";
import SeriesServices from "../Services";
import {
	AddOrRemoveTagFromSeriesDTO,
	AddOrRemoveKeywordFromSeriesDTO,
	CreateSeriesDTO,
	DeleteSeriesDTO,
	PublishSeriesDTO,
	UpdateSeriesDTO,
} from "../Types/seriesMutations.dtos";
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

		const message = await SeriesServices.publishedSeries(validatedData);

		return handleHttpSuccessResponse("SERIES_PUBLISHED", message);
	},

	deleteSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(SeriesValidators.deleteSeries, args.data as DeleteSeriesDTO);

		const message = await SeriesServices.deleteSeries(validatedData);

		return handleHttpSuccessResponse("SERIES_DELETED", message);
	},

	addTagToSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(
			SeriesValidators.addOrRemoveTagToSeries,
			args.data as AddOrRemoveTagFromSeriesDTO
		);

		return await SeriesServices.addTagToSeries(validatedData);
	},

	removeTagFromSeries: async (parents, args, context, info) => {
		const validatedData = await validateInput(
			SeriesValidators.addOrRemoveTagToSeries,
			args.data as AddOrRemoveTagFromSeriesDTO
		);

		return await SeriesServices.removeTagFromSeries(validatedData);
	},

	addKeywordToSeries: async (parent, args, context, info) => {
		const validatedData = await validateInput(
			SeriesValidators.addOrRemoveKeywordToSeries,
			args.data as AddOrRemoveKeywordFromSeriesDTO
		);

		return await SeriesServices.addKeywordToSeries(validatedData);
	},

	removeKeywordFromSeries: async (parents, args, context, info) => {
		const validatedData = await validateInput(
			SeriesValidators.addOrRemoveKeywordToSeries,
			args.data as AddOrRemoveKeywordFromSeriesDTO
		);

		return await SeriesServices.removeKeywordFromSeries(validatedData);
	},
};
