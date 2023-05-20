import Joi from "joi";
import { CreateSeriesDTO, DeleteSeriesDTO, UpdateSeriesDTO } from "../Types/seriesMutations.dtos";

export const seriesMutationsValidators = {
	createSeries: Joi.object<CreateSeriesDTO>({
		title: Joi.string().required(),
		description: Joi.string().required(),
		image: Joi.string().required(),
	}),

	updateSeries: Joi.object<UpdateSeriesDTO>({
		_id: Joi.string().required(),
		payload: Joi.object({
			title: Joi.string(),
			description: Joi.string(),
			image: Joi.string(),
		}),
	}),

	deleteSeries: Joi.object<DeleteSeriesDTO>({
		_id: Joi.string().required(),
	}),
};