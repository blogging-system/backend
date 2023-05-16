import Joi from "joi";
import { CreateSeriesDTO } from "../Types/seriesMutations.dtos";

export const seriesMutationsValidators = {
	createSeries: Joi.object<CreateSeriesDTO>({
		title: Joi.string().required(),
		description: Joi.string().required(),
		image: Joi.string().required(),
		tags: Joi.array().items(Joi.string().required()),
		keywords: Joi.array().items(Joi.string().required()),
	}),
};
