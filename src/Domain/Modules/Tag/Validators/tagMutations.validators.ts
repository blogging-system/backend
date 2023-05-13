import Joi from "joi";
import { CreateTagDTO } from "../Types";

export const tagMutationsValidators = {
	createTag: Joi.object<CreateTagDTO>({
		name: Joi.string().required(),
	}),
};
