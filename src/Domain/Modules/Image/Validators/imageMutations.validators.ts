import Joi from "joi";
import { CreateImageDTO, DeleteImageDTO, UpdateImageDTO } from "../Types";

export const imageMutationsValidators = {
	createImage: Joi.object<CreateImageDTO>({
		url: Joi.string().required(),
		altText: Joi.string().required(),
	}),

	updateImage: Joi.object<UpdateImageDTO>({
		_id: Joi.string().required(),
		payload: Joi.object<CreateImageDTO>({
			url: Joi.string(),
			altText: Joi.string(),
		}),
	}),

	deleteImage: Joi.object<DeleteImageDTO>({
		_id: Joi.string().required(),
	}),
};
