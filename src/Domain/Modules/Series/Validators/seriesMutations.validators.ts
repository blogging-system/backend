import Joi from "joi";
import { CreateSeriesDTO, PublishSeriesDTO, UpdateSeriesDTO } from "../Types/seriesMutations.dtos";

export const seriesMutationsValidators = {
	createSeries: Joi.object<CreateSeriesDTO>({
		title: Joi.string().required(),
		description: Joi.string().required(),
		image: Joi.string().required(),
		tags: Joi.array().items(Joi.string().required()),
		keywords: Joi.array().items(Joi.string().required()),
	}),

	updateSeries: Joi.object<UpdateSeriesDTO>({
		_id: Joi.string().required(),
		payload: Joi.object({
			title: Joi.string(),
			description: Joi.string(),
			image: Joi.string(),
			tags: Joi.array().items(Joi.string()),
			keywords: Joi.array().items(Joi.string()),
		}),
	}),

	publishSeries: Joi.object<PublishSeriesDTO>({
		_id: Joi.string().required(),
	}),
};
