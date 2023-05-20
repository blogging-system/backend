import Joi from "joi";
import { CreateImageDTO } from "../Types";

export const imageMutationsValidators = {
	createImage: Joi.object<CreateImageDTO>({
		url: Joi.string().required(),
		altText: Joi.string().required(),
	}),
};
